use crate::{Request, Respond};
use capra_ini::{configs::Configs as Configuration, parse::Parse};
use pheasant::http::{ErrorStatus, Method, err_stt, header_value, status};
use pheasant::services::{
    Content, Cors, ReadCookies, Resource, WriteCookies, socket::server::Socket,
};
use serde::{Deserialize, Serialize};
use std::sync::LazyLock;

// these are on the db 
#[derive(Deserialize)]
pub struct CachedConfigs {
    email_address: Option<Vec<u8>>,
    send_me_emails: bool,
}

pub struct ConfigData {
    account: Account,
    plugins: Plugins,
}

pub struct Account {
    user_name: Vec<u8>,
    email_address: Vec<u8>,
}

pub struct Plugins {
    // every bit represents a plugin
    installed: u16,

}

pub struct ConfigJson {
    headers: Vec<u8>,
    account: ,
    plugins: ,
}

// There should be 2 types of configs
// - the server general configs which only the admin who has the server installed can edit and are
// found in 'data/config.ini'
// - the user configs which only a user has access to after they login and
// some of their values (such as the active colorscheme) overwrite the general configs'
pub enum Configs {
    Read,
    Write,
    Reset,
}

impl Configs {
    pub fn new(req: &Request) -> Result<Self, ErrorStatus> {
        Ok(match req.path().last().map(|s| s.as_str()) {
            Some("read") => Self::Read,
            Some("write") => Self::Write,
            Some("reset") => Self::Reset,
            _ => return err_stt!(?500),
        })
    }
}

impl Resource<Socket> for Configs {
    async fn get(
        self,
        socket: &mut Socket,
        req: Request,
        resp: &mut Respond,
    ) -> Result<(), ErrorStatus> {
        let Self::Read = self else {
            return err_stt!(?500);
        };

        let configs = serde_json::to_vec(&CONFIGS.clone()?).map_err(|_| err_stt!(500))?;
        Content::new(&configs).dump_headers(resp.headers_mut());
        resp.body_mut().extend(configs);

        Ok(())
    }
}

#[derive(Debug, Clone)]
enum Error {
    FailedToReadConfigFile,
    FailedToParseConfigFile,
}

impl From<Error> for ErrorStatus {
    fn from(_err: Error) -> Self {
        err_stt!(500)
    }
}

const CONFIGS: LazyLock<Result<Configuration, Error>> = LazyLock::new(|| {
    let data = std::fs::read("config.ini").map_err(|_| Error::FailedToReadConfigFile)?;

    Configuration::deserialize(&data).map_err(|_| Error::FailedToParseConfigFile)
});
