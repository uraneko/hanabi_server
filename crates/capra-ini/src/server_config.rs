use crate::parse::Section;
use crate::parse::{Attribute, Component, Property};
use crate::parse::{Error, Parse, parse_vec};
use core::iter::Peekable;
use num_into_ascii::NumToAscii;
use std::collections::HashMap;

#[derive(Debug, Default, serde::Serialize, Clone, serde::Deserialize)]
pub struct ServerConfig {
    plugins: HashMap<String, Plugin>,
    colors: Colorschemes,
    // TODO
}

#[derive(Debug, Default, serde::Serialize, Clone, serde::Deserialize)]
pub struct Plugin {
    depict: String,
    root: String,
    accent: String,
    addr: String,
    disabled: bool,
}

#[derive(Debug, Default, serde::Serialize, Clone, serde::Deserialize)]
pub struct Colorscheme {
    pinned: bool,
    disabled: bool,
    props: HashMap<String, Prop>,
    selectors: HashMap<String, Vec<usize>>,
}

#[derive(Debug, Default, serde::Serialize, Clone, serde::Deserialize)]
pub struct Colorschemes {
    preferred: Option<String>,
    schemes: HashMap<String, Colorscheme>,
}

#[derive(Debug, Default, serde::Serialize, Clone, serde::Deserialize)]
pub struct Prop {
    val: String,
    idx: usize,
}

impl Prop {
    fn from_value(mut val: String) -> Result<Self, Error> {
        let Some(splitter) = val.chars().rev().position(|ch| ch == ' ') else {
            return Err(Error::FailedToParseValue);
        };
        let splitter = val.len() - splitter;
        let idx = val[splitter..]
            .parse()
            .map_err(|_| Error::FailedToParseValue)?;
        val.drain(splitter..);

        Ok(Self { val, idx })
    }
}

impl Parse for ServerConfig {
    fn parse_section(
        &mut self,
        mut section: Vec<String>,
        iter: &mut Peekable<impl Iterator<Item = Component>>,
    ) -> Result<(), Error> {
        match section.as_slice() {
            [val] if val == "main" => return Ok(()),
            [root] if root == "colors" => self.parse_colorschemes(iter)?,
            [root, branch] if root == "plugins" => self.parse_plugin(section.remove(1), iter)?,
            [root, branch] if root == "colors" => {
                self.parse_colorscheme(section.remove(1), iter)?
            }
            _ => return Err(Error::UnrecognizableSection),
        }

        Ok(())
    }

    fn stream(&self) -> impl IntoIterator<Item = u8> {
        let plugins = self
            .plugins
            .iter()
            .map(|(n, p)| stream_plugin(n, p))
            .flatten();
        let colorschemes = self
            .colors
            .schemes
            .iter()
            .map(|(n, c)| stream_scheme(n, c))
            .flatten();

        plugins
            .chain(Some(b'\n'))
            .chain(
                self.colors
                    .preferred
                    .as_ref()
                    .map(|prf| {
                        b"[colors]\npreferred = "
                            .into_iter()
                            .chain(prf.as_bytes().into_iter())
                            .chain(b"\n".into_iter())
                    })
                    .unwrap_or_default()
                    .copied(),
            )
            .chain(colorschemes)
    }
}

impl ServerConfig {
    fn parse_plugin(
        &mut self,
        name: String,
        iter: &mut Peekable<impl Iterator<Item = Component>>,
    ) -> Result<(), Error> {
        let mut drive = Plugin::default();
        loop {
            let Some(peeked) = iter.peek() else {
                break;
            };
            if peeked.is_section() {
                break;
            }

            let Some(comp) = iter.next() else {
                unreachable!("just checked that out above")
            };

            parse_plugin_comp(comp, &mut drive)?;
        }
        self.plugins.insert(name, drive);

        Ok(())
    }

    // handles the [colors] section
    fn parse_colorschemes(
        &mut self,
        iter: &mut Peekable<impl Iterator<Item = Component>>,
    ) -> Result<(), Error> {
        let Some(peeked) = iter.peek() else {
            return Ok(());
        };
        if peeked.is_section() {
            return Ok(());
        }

        let Some(Component::Property(Property { key, val })) = iter.next() else {
            return Err(Error::UnexpectedComponent);
        };
        if key != "preferred" {
            return Err(Error::UndesirablePropertyKey);
        }
        self.colors.preferred = Some(val);

        Ok(())
    }

    fn parse_colorscheme(
        &mut self,
        name: String,
        iter: &mut Peekable<impl Iterator<Item = Component>>,
    ) -> Result<(), Error> {
        let mut scheme = Colorscheme::default();

        loop {
            let Some(peeked) = iter.peek() else {
                break;
            };

            if let Component::Section(Section(section)) = peeked {
                // panic!("errout>{:?}", section);

                match section.as_slice() {
                    [_colors, _scheme, _sub]
                        if _colors == "colors" && _scheme == &name && _sub == "props" =>
                    {
                        iter.next();
                        parse_scheme_props(&mut scheme, iter)?;
                    }
                    [_colors, _scheme, _sub]
                        if _colors == "colors" && _scheme == &name && _sub == "selectors" =>
                    {
                        iter.next();
                        parse_scheme_selectors(&mut scheme, iter)?;
                    }
                    _ => break,
                }
            } else {
                let Some(comp) = iter.next() else {
                    unreachable!("just checked that out above")
                };

                parse_scheme_comp(comp, &mut scheme)?;
            }
        }
        self.colors.schemes.insert(name, scheme);

        Ok(())
    }
}

fn parse_plugin_comp(comp: Component, plugin: &mut Plugin) -> Result<(), Error> {
    match comp {
        Component::Comment(_) => return Ok(()),
        Component::Property(Property { key, val }) => match key.as_str() {
            "address" => plugin.addr = val,
            // "tags" => plugin.tags = parse_vec(&val)?,
            "accent" => plugin.accent = val,
            "root" => plugin.root = val,
            "depict" => plugin.depict = val,
            _ => return Err(Error::UndesirablePropertyKey),
        },
        Component::Attribute(Attribute(attr)) => {
            if attr != "disabled" {
                return Err(Error::UnexpectedAttribute);
            }
        }
        _ => return Err(Error::UnexpectedComponent),
    }

    Ok(())
}

fn parse_scheme_comp(comp: Component, scheme: &mut Colorscheme) -> Result<(), Error> {
    match comp {
        Component::Comment(_) => return Ok(()),
        Component::Attribute(Attribute(attr)) => {
            if attr == "disabled" {
                scheme.disabled = true;
            } else if attr == "pinned" {
                scheme.pinned = true;
            } else {
                return Err(Error::UnexpectedAttribute);
            }
        }
        _ => {
            // println!("comp>{:?}", comp);
            return Err(Error::UnexpectedComponent);
        }
    }

    Ok(())
}

fn parse_scheme_props(
    scheme: &mut Colorscheme,
    iter: &mut Peekable<impl Iterator<Item = Component>>,
) -> Result<(), Error> {
    while let Some(Component::Property(_)) = iter.peek() {
        let Some(Component::Property(prop)) = iter.next() else {
            unreachable!("checked above");
        };

        scheme.props.insert(prop.key, Prop::from_value(prop.val)?);
    }

    Ok(())
}

fn parse_scheme_selectors(
    scheme: &mut Colorscheme,
    iter: &mut Peekable<impl Iterator<Item = Component>>,
) -> Result<(), Error> {
    while let Some(Component::Property(_)) = iter.peek() {
        let Some(Component::Property(prop)) = iter.next() else {
            unreachable!("checked above");
        };

        scheme.selectors.insert(prop.key, parse_vec(&prop.val)?);
    }

    Ok(())
}

fn stream_plugin<'a>(name: &'a str, plugin: &'a Plugin) -> impl IntoIterator<Item = u8> {
    b"[plugins."
        .into_iter()
        .chain(name.as_bytes().into_iter())
        .chain(b"]\n".into_iter())
        .chain(b"depict = ".into_iter())
        .chain(plugin.depict.as_bytes().into_iter())
        .chain(b"\nroot = ".into_iter())
        .chain(plugin.root.as_bytes().into_iter())
        .chain(b"\naccent = ".into_iter())
        .chain(plugin.accent.as_bytes().into_iter())
        .chain(b"\naddress = ".into_iter())
        .chain(plugin.addr.as_bytes().into_iter())
        .chain(
            plugin
                .disabled
                .then(|| b"\ndisabled".into_iter())
                .unwrap_or_default(),
        )
        .chain(Some(&b'\n'))
        .copied()
}

fn stream_scheme<'a>(name: &'a str, scheme: &'a Colorscheme) -> impl IntoIterator<Item = u8> {
    let props = stream_scheme_props(name, &scheme.props);
    let selectors = stream_scheme_selectors(name, &scheme.selectors);

    b"[colors."
        .into_iter()
        .chain(name.as_bytes().into_iter())
        .chain(b"]\n".into_iter())
        .chain(
            scheme
                .pinned
                .then(|| b"pinned\n".into_iter())
                .unwrap_or_default(),
        )
        .chain(
            scheme
                .disabled
                .then(|| b"disabled\n".into_iter())
                .unwrap_or_default(),
        )
        .copied()
        .chain(props)
        .chain(selectors)
}

fn stream_scheme_props(name: &str, props: &HashMap<String, Prop>) -> impl IntoIterator<Item = u8> {
    b"[colors."
        .into_iter()
        .chain(name.as_bytes().into_iter())
        .chain(b".props]\n".into_iter())
        .copied()
        .chain(
            props
                .iter()
                .map(|(n, p)| {
                    let (slice, size) = p.idx.ascii_bytes();
                    let idx = slice[..size].to_vec();

                    stream_prop(n, &p.val.as_bytes(), idx)
                })
                .flatten(),
        )
}

fn stream_prop<'a>(name: &'a str, val: &'a [u8], idx: Vec<u8>) -> impl IntoIterator<Item = u8> {
    name.as_bytes()
        .into_iter()
        .chain(b" = ".into_iter())
        .chain(val.iter())
        .chain(Some(&b' '))
        .copied()
        .chain(idx.into_iter())
        .chain(Some(b'\n'))
}

fn stream_scheme_selectors(
    name: &str,
    selectors: &HashMap<String, Vec<usize>>,
) -> impl IntoIterator<Item = u8> {
    b"[colors."
        .into_iter()
        .chain(name.as_bytes().into_iter())
        .chain(b".selectors]\n".into_iter())
        .copied()
        .chain(
            selectors
                .iter()
                .map(|(n, p)| stream_selector(n, &p))
                .flatten(),
        )
        .chain(Some(b'\n'))
}

fn stream_selector<'a>(selector: &'a str, props: &'a [usize]) -> impl IntoIterator<Item = u8> {
    let mut props = props
        .into_iter()
        .map(|idx| {
            let (slice, size) = idx.ascii_bytes();

            let mut v = slice[..size].to_vec();
            v.push(b' ');

            v
        })
        .flatten();
    props.next_back();
    selector
        .as_bytes()
        .into_iter()
        .chain(b" = ".into_iter())
        .copied()
        .chain(props)
        .chain(Some(b'\n'))
}
