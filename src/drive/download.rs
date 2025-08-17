use super::DrivePath;
use pheasant::{HeaderMap, Request, Response, get, post};
use std::{fs, io::Write};

// TODO content-dispositon header for downloads
#[get("drive/download")]
#[mime("application/octet-stream")]
#[cors(methods = get, origins = "http://localhost:3000", headers = "*")]
pub async fn download(dp: DrivePath) -> Response {
    let mut resp = Response::default();
    resp.update_body(std::fs::read(dp.0).unwrap())
        .set_header("Content-Disposition", "attachment".to_owned());

    resp
}

pub struct Upload {
    data: String,
    name: String,
}

impl From<&Request> for Upload {
    fn from(req: &Request) -> Self {
        Self {
            data: req.body().unwrap().to_string(),
            name: format!(
                "uploads/{}",
                req.param("name")
                    .unwrap()
                    .trim_start_matches("C:\\fakepath\\")
            ),
        }
    }
}

#[post("drive/upload")]
#[mime("text/plain")]
#[cors(methods = [post, get], origins = "http://localhost:3000", headers = "*")]
pub async fn upload(up: Upload) -> Vec<u8> {
    let mut file = fs::File::create(up.name).unwrap();

    file.write_all(&up.data.into_bytes()).unwrap();
    file.flush().unwrap();

    b"successfully uploaded new file".to_vec()
}
