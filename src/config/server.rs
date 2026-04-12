use crate::{Request, Respond};
use capra_ini::{parse::Parse, server_config::ServerConfig};
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
