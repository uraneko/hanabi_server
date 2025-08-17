// use pheasant_core::{Cors, Method, Protocol, Response, Server, Service, get};
use pheasant::{Server, ServiceBundle, fail, get};

mod drive;
use drive::{download, drive_hints, file_hints, file_tree, read_dir, upload};

#[tokio::main]
async fn main() {
    let mut server = Server::new([0, 0, 0, 0], 9998, 9999).unwrap();
    server
        .service(index)
        .service(styles)
        .service(bundle)
        .service(fav)
        .service(file_hints)
        .service(read_dir)
        .service(file_tree)
        .service(drive_hints)
        .service(download)
        .service(upload)
        .error(not_found)
        // .service(|| Service::new(Method::Options, "*", [], "", opts));
;
    server.serve().await;
}

// struct Auth {
//     name: String,
//     psw: String,
//     memorize: bool,
// }

#[get("/")]
#[mime("text/html")]
#[re("/index.html", "/home")]
async fn index(_: ()) -> Vec<u8> {
    std::fs::read("dist/index.html").unwrap()
}

#[get("/css")]
#[mime("text/css")]
async fn styles(_: ()) -> Vec<u8> {
    std::fs::read("dist/assets/styles.css").unwrap()
}

#[get("/js")]
#[mime("text/javascript")]
async fn bundle(_: ()) -> Vec<u8> {
    std::fs::read("dist/assets/bundle.js").unwrap()
}

#[get("/favicon.ico")]
#[mime("image/svg+xml")]
async fn fav(_: ()) -> Vec<u8> {
    std::fs::read("dist/assets/hanabi.svg").unwrap()
}

const NOT_FOUND: &[u8] = include_bytes!("../../pheasant/pheasant_core/templates/404.html");

#[fail(404)]
#[mime("text/html")]
async fn not_found() -> Vec<u8> {
    NOT_FOUND.to_owned()
}

// async fn opts(_: (), p: Protocol) -> Response {
//     let mut resp = Response::with_proto(p);
//     let mut cors = Cors::new();
//     cors.methods()
//         .extend(&[Method::Get, Method::Options, Method::Head, Method::Post]);
//     cors.headers().insert("*".into());
//     cors.origin("*");
//
//     resp.set_cors(cors);
//
//     resp
// }
