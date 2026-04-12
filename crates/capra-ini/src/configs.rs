use crate::parse::Section;
use crate::parse::{Attribute, Component, Property};
use crate::parse::{Error, Parse, parse_vec};
use core::iter::Peekable;
use std::collections::HashMap;

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct ServerConfig {
    plugins: HashMap<String, Plugin>,
    colors: HashMap<String, Colorscheme>,
    // TODO
}

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct Plugin {
    depict: String,
    root: String,
    accent: String,
    addr: String,
    disabled: bool,
}

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct Colorscheme {
    pinned: bool,
    disabled: bool,
    props: HashMap<String, Prop>,
    selectors: HashMap<String, Vec<usize>>,
}

#[derive(Debug, Default, serde::Serialize, Clone)]
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
            [root, branch] if root == "plugins" => self.parse_plugin(section.remove(1), iter)?,
            [root, branch] if root == "colors" => {
                self.parse_colorscheme(section.remove(1), iter)?
            }
            _ => return Err(Error::UnrecognizableSection),
        }

        Ok(())
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

            self.parse_plugin_comp(comp, &mut drive)?;
        }
        self.plugins.insert(name, drive);

        Ok(())
    }

    fn parse_plugin_comp(&mut self, comp: Component, plugin: &mut Plugin) -> Result<(), Error> {
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
                        self.parse_scheme_props(&mut scheme, iter)?;
                    }
                    [_colors, _scheme, _sub]
                        if _colors == "colors" && _scheme == &name && _sub == "selectors" =>
                    {
                        iter.next();
                        self.parse_scheme_selectors(&mut scheme, iter)?;
                    }
                    _ => break,
                }
            } else {
                let Some(comp) = iter.next() else {
                    unreachable!("just checked that out above")
                };

                self.parse_scheme_comp(comp, &mut scheme)?;
            }
        }
        self.colors.insert(name, scheme);

        Ok(())
    }

    fn parse_scheme_comp(
        &mut self,
        comp: Component,
        scheme: &mut Colorscheme,
    ) -> Result<(), Error> {
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
        &mut self,
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
        &mut self,
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
}
