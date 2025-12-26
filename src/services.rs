use pheasant::http::{ErrorStatus, Method, Respond, err_stt, request::Request, status};
use pheasant::services::{
    Cors, MessageBodyInfo, ReadCookies, Resource, Service, Socket, WriteCookies,
};

type HttpResult<T> = Result<T, ErrorStatus>;

impl Service<Socket> for Services {
    async fn serve(&self, socket: &mut Socket, req: Request, resp: &mut Respond) -> HttpResult<()> {
        match self {
            Self::Auth => Auth::new(0).run(socket, req, resp).await,
        }
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
}

impl Resource<Socket> for Auth {
    // gets current auth token
    async fn get(&self, socket: &mut Socket, req: Request, resp: &mut Respond) -> HttpResult<()> {
        let Some(query) = req.query() else {
            return err_stt!(?400);
        };

        let Some(Ok(_user)) = query.param("user").map(|user| user.parse::<u8>()) else {
            return err_stt!(?400);
        };

        // std::thread::sleep(std::time::Duration::from_millis(1372));

        cors(&req, resp)?;

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
        cors(&req, resp)?;

        Ok(())
    }

    // changes the auth token
    // elevates or drops user
    async fn post(
        &self,
        socket: &mut Socket,
        req: Request,
        resp: &mut Respond,
    ) -> Result<(), ErrorStatus> {
        let Some(data) = req.body() else {
            return err_stt!(?400);
        };

        if data.starts_with(b"method_override=put") {
            return self.put(socket, req, resp).await;
        }

        let form = Login::parse(data)?;
        let mut stt = socket
            .conn
            .prepare("select * from users where name = ? and password = ?")
            .map_err(|_| err_stt!(500))?;
        stt.bind_iter::<_, (_, &str)>([
            (1, form.name.as_str().into()),
            (2, form.pswd.as_str().into()),
        ])
        .map_err(|_| err_stt!(500))?;
        match stt.next() {
            Ok(sqlite::State::Row) => (),
            Ok(sqlite::State::Done) | Err(_) => return err_stt!(?500),
        }

        let (Ok(name), Ok(pswd)) = (
            stt.read::<String, _>("name"),
            stt.read::<String, _>("password"),
        ) else {
            return err_stt!(?500);
        };
        form.match_user(&name, &pswd)?;
        let cookies = ReadCookies::from_headers(req.headers()).map_err(|_| err_stt!(400))?;
        if !cookies.contains(b"tkn") {
            let mut cookies = WriteCookies::new();
            // set a traveller token cookie for the recent user
            cookies
                .cookie(b"tkn", b"boukennoshou")
                .samesite(0)
                .secure(true)
                .partitioned(true);
            _ = cookies.write(b"tkn", resp.headers_mut());
        }

        Ok(())
    }

    // creates a new auth token
    // happens when user opens site
    async fn put(
        &self,
        socket: &mut Socket,
        req: Request,
        resp: &mut Respond,
    ) -> Result<(), ErrorStatus> {
        let Some(data) = req.body() else {
            return err_stt!(?400);
        };

        let form = Register::parse(data)?;
        let mut stt = socket
            .conn
            .prepare("insert into users values (:name, :password)")
            .map_err(|_| err_stt!(500))?;
        stt.bind_iter::<_, (_, sqlite::Value)>([
            (":name", form.name.into()),
            (":password", form.pswd.into()),
        ])
        .map_err(|_| err_stt!(500))?;
        stt.next().map_err(|_| err_stt!(500))?;
        resp.status(status!(201));
        let msg = b"new account created successfully";
        MessageBodyInfo::new(msg);
        resp.body_mut().extend(msg);

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

#[derive(Debug, Default)]
struct Login {
    name: String,
    pswd: String,
}

impl Login {
    fn parse(slice: &[u8]) -> Result<Self, ErrorStatus> {
        let mut form = Self::default();
        let mut idx = 0;

        form.name = user_name(&slice[idx..], &mut idx)?;
        form.pswd = user_pswd(&slice[idx..], &mut idx)?;

        Ok(form)
    }

    fn match_user(&self, name: &str, pswd: &str) -> Result<(), ErrorStatus> {
        if self.name == name && self.pswd == pswd {
            Ok(())
        } else {
            err_stt!(?500)
        }
    }
}

#[derive(Debug, Default)]
struct Register {
    name: String,
    pswd: String,
}

impl Register {
    fn parse(slice: &[u8]) -> HttpResult<Self> {
        let mut form = Self::default();
        let mut idx = 0;

        method_override(&slice[idx..], &mut idx)?;
        form.name = user_name(&slice[idx..], &mut idx)?;
        // println!("{:?}", str::from_utf8(slice));
        form.pswd = user_pswd(&slice[idx..], &mut idx)?;

        Ok(form)
    }
}

fn check_field(slice: &[u8], check: &[u8]) -> bool {
    slice.starts_with(check)
}

fn advance(idx: &mut usize, slice: &[u8]) -> usize {
    let old = *idx;
    *idx += slice.len();

    *idx - old
}

fn parse_value(slice: &[u8], idx: &mut usize) -> HttpResult<String> {
    let amper = if !slice.contains(&b'&') {
        *idx + slice.len()
    } else {
        match slice.iter().position(|b| *b == b'&') {
            Some(amper) => amper,
            None => return err_stt!(?400),
        }
    };

    let value = str::from_utf8(&slice[..amper])
        .map_err(|_| err_stt!(400))
        .map(|s| s.to_owned());
    *idx += amper + 1;

    value
}

fn method_override(slice: &[u8], idx: &mut usize) -> HttpResult<()> {
    if !check_field(slice, b"method_override") {
        return err_stt!(?400);
    }

    advance(idx, b"method_override=put&");
    Ok(())
}

fn user_name(slice: &[u8], idx: &mut usize) -> HttpResult<String> {
    if !check_field(slice, b"user_name=") {
        return err_stt!(?400);
    }
    let diff = advance(idx, b"user_name=");

    parse_value(&slice[diff..], idx)
}

fn user_pswd(slice: &[u8], idx: &mut usize) -> HttpResult<String> {
    if !check_field(slice, b"user_pswd") {
        return err_stt!(?400);
    }
    let diff = advance(idx, b"user_pswd=");

    parse_value(&slice[diff..], idx)
}

fn cors(req: &Request, resp: &mut Respond) -> Result<(), ErrorStatus> {
    Cors::new()
        .origins(&[
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
        ])
        .headers(&["content-type", "content-length", "set-cookie"])
        .credentials(true)
        .methods(&[Method::Post, Method::Put])
        .cors(req.headers(), resp.headers_mut())
        .map_err(|_| err_stt!(403))
}
