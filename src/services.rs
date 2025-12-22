use pheasant::http::{ErrorStatus, Header, Method, Respond, err_stt, request::Request};
use pheasant::services::{
    Cors, MessageBodyInfo, ReadCookies, Resource, Service, Socket, WriteCookies,
};

type HttpResult<T> = Result<T, ErrorStatus>;

impl Service<Socket> for Services {
    async fn serve(&self, socket: &mut Socket, req: Request, resp: &mut Respond) -> HttpResult<()> {
        match self {
            Self::Auth => Auth::new(0).run(socket, req, resp).await?,
        }
        Ok(())
    }
}

#[derive(Debug)]
pub enum Services {
    Auth,
}

#[derive(Debug)]
enum Auth {
    Nameless,
    Traveller,
    Citizen,
    Mayor,
}

impl Auth {
    fn new(clearance: u8) -> Self {
        match clearance {
            0 => Self::Nameless,
            1 => Self::Traveller,
            2 => Self::Citizen,
            4 => Self::Mayor,
            _ => Self::Nameless,
        }
    }

    fn elevate() {}

    fn drop() {}
}

impl Resource<Socket> for Auth {
    // gets current auth token
    async fn get(&self, socket: &mut Socket, req: Request, resp: &mut Respond) -> HttpResult<()> {
        // std::thread::sleep(std::time::Duration::from_millis(1372));
        let cookies = ReadCookies::from_headers(req.headers()).map_err(|_| err_stt!(400))?;
        if !cookies.contains(b"tkn") {
            let mut cookies = WriteCookies::new();
            // set a traveller token cookie for the recent user
            cookies
                .cookie(b"tkn", b"3r2eFE^$TGRE^#EWF")
                .samesite(0)
                .secure(true)
                .partitioned(true)
                .max_age(183);
            _ = cookies.write(b"tkn", resp.headers_mut());
        }
        Cors::new()
            .origins(&[
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:3002",
            ])
            .headers(&["content-type", "content-length", "set-cookie"])
            .credentials(true)
            .methods(&[Method::Post, Method::Put])
            .cors_with_cookies(req.headers(), resp.headers_mut())
            .map_err(|_| err_stt!(403))?;

        let data = format!("{}", 1).into_bytes();
        resp.body_mut().extend(&data);
        MessageBodyInfo::new(&data).dump_headers(resp.headers_mut());

        Ok(())
    }

    async fn options(
        &self,
        socket: &mut Socket,
        req: Request,
        resp: &mut Respond,
    ) -> HttpResult<()> {
        let cookies = ReadCookies::from_headers(req.headers()).map_err(|_| err_stt!(400))?;
        if !cookies.contains(b"tkn") {
            let mut cookies = WriteCookies::new();
            // set a traveller token cookie for the recent user
            cookies
                .cookie(b"tkn", b"Traveller")
                .samesite(0)
                .secure(true)
                .partitioned(true)
                .max_age(183);

            _ = cookies.write(b"tkn", resp.headers_mut());
        }
        Cors::new()
            .origins(&[
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:3002",
            ])
            .header("*")
            .credentials(true)
            .methods(&[Method::Post, Method::Put])
            .cors(req.headers(), resp.headers_mut())
            .map_err(|_| err_stt!(403))?;

        Ok(())
    }

    // changes the auth token
    // elevates or drops user
    async fn post(&self, socket: &mut Socket, req: Request, resp: &mut Respond) -> HttpResult<()> {
        Ok(())
    }

    // creates a new auth token
    // happens when user opens site
    async fn put(&self, socket: &mut Socket, req: Request, resp: &mut Respond) -> HttpResult<()> {
        Ok(())
    }

    // deletes an auth token
    async fn delete(
        &self,
        socket: &mut Socket,
        req: Request,
        resp: &mut Respond,
    ) -> HttpResult<()> {
        Ok(())
    }
}

pub fn lookup(path: &str) -> HttpResult<Services> {
    Ok(match path {
        "/auth/user" => Services::Auth,
        _ => return err_stt!(?404),
    })
}

pub fn route_user_method(method: Method, action: &str) -> HttpResult<Method> {
    if method == Method::Get {
        return Ok(method);
    } else if method == Method::Post {
        return Ok(match action {
            "put" => Method::Put,
            "post" => method,
            _ => return err_stt!(?400),
        });
    }

    err_stt!(?400)
}
