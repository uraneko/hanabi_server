use crate::{Request, Respond};
use capra_ini::{configs::ServerConfig, parse::Parse};
use pheasant::http::{ErrorStatus, Method, err_stt, header_value, status};
use pheasant::services::{
    Content, Cors, ReadCookies, Resource, WriteCookies, socket::server::Socket,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::LazyLock;

// There should be 2 types of configs
// - the server general configs which only the admin who has the server installed can edit and are
// found in 'data/config.ini'
// - the user configs which only a user has access to after they login and
// some of their values (such as the active colorscheme) overwrite the general configs'

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

const CONFIGS: LazyLock<Result<ServerConfig, Error>> = LazyLock::new(|| {
    let data = std::fs::read("config.ini").map_err(|_| Error::FailedToReadConfigFile)?;

    ServerConfig::parse(&data).map_err(|_| Error::FailedToParseConfigFile)
});

pub struct UserConfig {
    account: (),
    account_security: Security,
    plugins: Vec<Plugin>,
    colors: Vec<Colorscheme>,
    // TODO
    colors_build: (),
}

pub struct Security {
    send_me_emails: bool,
    expose_my_address: bool,
}

pub struct Plugin {
    depict: String,
    root: String,
    accent: String,
    address: String,
}

pub struct Colorscheme {
    pinned: bool,
    props: HashMap<String, Prop>,
    selectors: HashMap<String, Vec<usize>>,
}

pub struct Prop {
    value: String,
    idx: usize,
}
