use super::auth::{
    extract_sole_row,
    operations::{db_fetch_user_pfp, db_get_name_from_access, db_update_user_pfp},
    prologue::Token,
};
use crate::{Request, Respond};
use pheasant::http::header_value;
use pheasant::http::{ErrorStatus, err_stt};
use pheasant::services::{Content, Resource, socket::server::Socket};
use sqlx::{Result, Row, sqlite::SqliteRow};

async fn fetch_pfp(req: &Request, socket: &mut Socket) -> Result<SqliteRow, ErrorStatus> {
    let name = get_name_from_access(&req, socket).await?;
    let name = name.try_get("user").map_err(|_| err_stt!(500))?;
    let data = extract_sole_row(
        db_fetch_user_pfp(&mut socket.conn, name)
            .await
            .map_err(|_| err_stt!(500))?,
    )?;

    Ok(data)
}

fn respond_with_pfp(resp: &mut Respond, data: SqliteRow) -> Result<(), ErrorStatus> {
    let pfp: Option<&[u8]> = data.try_get("pfp").map_err(|_| err_stt!(500))?;
    if let Some(pfp) = pfp {
        Content::new(pfp).dump_headers(resp.headers_mut());
        resp.body_mut().extend(pfp);
    } else {
        Content::with_len(0);
    }

    Ok(())
}

pub enum User {
    Update(Update),
    View(String),
}

impl User {
    pub fn new(req: &mut Request) -> Result<Self, ErrorStatus> {
        let mut path = req.take_path();
        match path.as_slice() {
            [_, action, target] if action == "update" => {
                return Ok(Self::Update(Update::new(path.remove(2), req.take_body())?));
            }
            [_, action, target] if action == "view" => return Ok(Self::View(path.remove(2))),
            _ => return err_stt!(?400),
        }
    }
}

impl Resource<Socket> for User {
    // view
    async fn get(
        self,
        socket: &mut Socket,
        req: Request,
        resp: &mut Respond,
    ) -> Result<(), ErrorStatus> {
        let Self::View(target) = self else {
            return err_stt!(?500);
        };

        match target.as_str() {
            "pfp" => {
                let pfp = fetch_pfp(&req, socket).await?;
                respond_with_pfp(resp, pfp)?;
            }
            _ => return err_stt!(?500),
        }

        Ok(())
    }

    // update
    async fn patch(
        self,
        socket: &mut Socket,
        req: Request,
        resp: &mut Respond,
    ) -> Result<(), ErrorStatus> {
        let Self::Update(Update { target, data }) = self else {
            return err_stt!(?500);
        };

        let name = get_name_from_access(&req, socket).await?;
        let name = name.try_get("user").map_err(|_| err_stt!(500))?;
        match target.as_str() {
            "pfp" => db_update_user_pfp(&mut socket.conn, name, &data)
                .await
                .map_err(|_| err_stt!(500))?,
            _ => return err_stt!(?500),
        }

        Ok(())
    }
}

pub struct Update {
    target: String,
    data: Vec<u8>,
}

impl Update {
    fn new(target: String, data: Option<Vec<u8>>) -> Result<Self, ErrorStatus> {
        let Some(data) = data else {
            return err_stt!(?400);
        };

        Ok(Self { target, data })
    }
}

async fn get_name_from_access(
    req: &Request,
    socket: &mut Socket,
) -> Result<SqliteRow, ErrorStatus> {
    let Some(access) = header_value(req.headers(), b"authorization") else {
        return err_stt!(?403);
    };
    let access = Token::from_encoded(Token::ACCESS, &access[7..access.len() - 1])?;
    access.hash(&mut socket.buffer);
    extract_sole_row(
        db_get_name_from_access(&mut socket.conn, &socket.buffer)
            .await
            .map_err(|_| err_stt!(500))?,
    )
}
