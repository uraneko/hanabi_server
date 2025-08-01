use pheasant_core::{Server, get};

mod drive;
use drive::{file_hints, file_tree, read_dir};

#[tokio::main]
async fn main() {
    let mut server = Server::new([0, 0, 0, 0], 9998, 9999).unwrap();
    server.service(index);
    server.service(styles);
    server.service(bundle);
    server.service(fav);
    server.service(file_hints);
    server.service(read_dir);
    server.service(file_tree);

    server.serve().await;
}

async fn auth(_: ()) -> Vec<u8> {
    vec![]
}

struct Auth {
    name: String,
    psw: String,
    memorize: bool,
}

#[get("/")]
#[mime("text/html")]
#[re("index.html", "home")]
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
