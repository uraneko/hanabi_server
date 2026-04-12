use crate::parse::Section;
use crate::parse::{Attribute, Component, Property};
use crate::parse::{Error, Parse, parse_vec};
use core::iter::Peekable;
use num_into_ascii::NumToAscii;
use std::collections::HashMap;

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct UserConfig {
    account_security: Security,
}

#[derive(Debug, Default, serde::Serialize, Clone)]
pub struct Security {
    send_me_emails: bool,
    expose_my_address: bool,
}

impl Parse for UserConfig {
    fn parse_section(
        &mut self,
        mut section: Vec<String>,
        iter: &mut Peekable<impl Iterator<Item = Component>>,
    ) -> Result<(), Error> {
        match section.as_slice() {
            [val] if val == "main" => return Ok(()),
            [root, branch] if root == "account" && branch == "security" => {
                self.parse_security(iter)?
            }
            _ => return Err(Error::UnrecognizableSection),
        }

        Ok(())
    }

    fn stream(&self) -> impl IntoIterator<Item = u8> {
        b"[account.security]\n"
            .into_iter()
            .chain(
                self.account_security
                    .send_me_emails
                    .then(|| b"send_me_emails\n".into_iter())
                    .unwrap_or_default(),
            )
            .chain(
                self.account_security
                    .expose_my_address
                    .then(|| b"expose_my_address\n".into_iter())
                    .unwrap_or_default(),
            )
            .copied()
    }
}

impl UserConfig {
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

