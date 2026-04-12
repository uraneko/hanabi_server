use crate::{Request, Respond};
use pheasant::http::{ErrorStatus, err_stt};
use pheasant::services::{Resource, Service, socket::server::Socket};

mod auth;
mod routing;

use auth::Auth;
use routing::Routing;

impl Service<Socket> for Services {
    async fn serve(
        &self,
        socket: &mut Socket,
        mut req: Request,
        resp: &mut Respond,
    ) -> Result<(), ErrorStatus> {
        match self {
            Self::Auth => Auth::new(&mut req)?.run(socket, req, resp).await,
            Self::Routing => Routing::new(&req.path_str())?.run(socket, req, resp).await,
        }
    }
}

#[derive(Debug)]
pub enum Services {
    Auth,
    Routing,
}

pub const APP_ROUTES: &[&str] = &["/", "/index.html", "/home", "/auth"];

pub fn lookup(path: &str) -> Result<Services, ErrorStatus> {
    Ok(match path {
        p if p.starts_with("/auth") => Services::Auth,
        p if APP_ROUTES.contains(&p) || p.starts_with("/assets/") => Services::Routing,
        _ => return err_stt!(?404),
    })
}

pub fn gateway_router(req: &Request) -> Option<&str> {
    match req.path_str() {
        p if p.starts_with("/drive") => Some("127.0.0.1:6608"),
        _ => None,
    }
}
