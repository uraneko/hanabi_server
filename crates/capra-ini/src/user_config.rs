use crate::parse::Section;
use crate::parse::{Attribute, Component, Property};
use crate::parse::{Error, Parse, parse_vec};
use core::iter::Peekable;
use num_into_ascii::NumToAscii;
use std::collections::HashMap;

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct UserConfig {
    account_security: Security,
    colors: Colorschemes,
}

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct Colorschemes {
    preferred: Option<String>,
}

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct Security {
    send_me_emails: bool,
    expose_my_address: bool,
}

impl Parse for UserConfig {
    fn parse_section(
        &mut self,
        section: Vec<String>,
        iter: &mut Peekable<impl Iterator<Item = Component>>,
    ) -> Result<(), Error> {
        match section.as_slice() {
            [val] if val == "main" => return Ok(()),
            [root] if root == "colors" => self.parse_colorschemes(iter)?,
            [root, branch] if root == "account" && branch == "security" => {
                self.parse_security(iter)?
            }
            _ => return Err(Error::UnrecognizableSection),
        }

        Ok(())
    }

    fn stream(&self) -> impl IntoIterator<Item = u8> {
        stream_account_security(&self.account_security)
            .into_iter()
            .chain(stream_colorschemes(&self.colors))
    }
}

impl UserConfig {
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

    fn parse_security(
        &mut self,
        iter: &mut Peekable<impl Iterator<Item = Component>>,
    ) -> Result<(), Error> {
        let security = &mut self.account_security;
        while let Some(peeked) = iter.peek() {
            let Some(comp) = iter.next() else {
                unreachable!("checked above")
            };
            if comp.is_section() {
                break;
            }

            let Component::Attribute(Attribute(attr)) = comp else {
                return Err(Error::UnexpectedComponent);
            };

            if attr == "send_me_emails" {
                security.send_me_emails = true;
            } else if attr == "expose_my_address" {
                security.expose_my_address = true;
            } else {
                return Err(Error::UnexpectedAttribute);
            }
        }

        Ok(())
    }
}

fn stream_account_security(sec: &Security) -> impl IntoIterator<Item = u8> {
    let acc_sec = if !sec.send_me_emails && !sec.expose_my_address {
        b"".into_iter()
    } else {
        b"[account.security]\n".into_iter()
    };

    acc_sec
        .chain(
            sec.send_me_emails
                .then(|| b"send_me_emails\n".into_iter())
                .unwrap_or_default(),
        )
        .chain(
            sec.expose_my_address
                .then(|| b"expose_my_address\n".into_iter())
                .unwrap_or_default(),
        )
        .copied()
}

fn stream_colorschemes(colors: &Colorschemes) -> impl IntoIterator<Item = u8> {
    colors
        .preferred
        .as_ref()
        .map(|prf| {
            b"[colors]\npreferred = "
                .into_iter()
                .chain(prf.as_bytes().into_iter())
                .chain(b"\n".into_iter())
        })
        .unwrap_or_default()
        .copied()
}

