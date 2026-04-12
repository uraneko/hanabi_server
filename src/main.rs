use pheasant::http::{ErrorStatus, Header, Protocol, err_stt, status};
use pheasant::services::{
    GateWay, Server, http_error,
    print::server::{print_req, print_resp},
    request,
    socket::server::Socket,
};

mod services;
use services::lookup;
mod config;

type Request = pheasant::http::Request<Vec<Header>>;
type Respond = pheasant::http::Respond<Vec<u8>>;

#[derive(Debug)]
enum Error {
    ServerMishap,
    ServerUninit,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let mut socket = Socket::builder("127.0.0.1:6688")
        .map_err(|_| Error::ServerUninit)?
        .database("data/main.db3")
        .build()
        .await
        .map_err(|_| Error::ServerUninit)?;

    println!("{}", socket.init_message());
    socket
        .event_loop(event_loop)
        .await
        .map_err(|_| Error::ServerMishap)?;

    Ok(())
}

async fn event_loop(server: &mut Socket) -> Result<(), ErrorStatus> {
    let mut resp = Respond::new(Protocol::Http11, status!(200));
    let sock = server.inner();
    while let Ok(client) = sock.accept() {
        println!("client = >{:?}<", client);
        // parse req
        let n = server.read(client.fd()).map_err(|_| err_stt!(500))?;
        let req = &server.buf_ref()[..n];
        let Ok(req) = request(req) else {
            http_error(err_stt!(400), &mut resp);
            server
                .write(client.fd(), &mut resp)
                .map_err(|_| err_stt!(500))?;

            continue;
        };
        print_req(&req);

        // gateway handling
        if let Some(addr) =
            GateWay::route(services::gateway_router, &req).map_err(|_| err_stt!(500))?
        {
            let sockk = pheasant::socket::Socket::new(
                pheasant::socket::AddressFamily::Inet,
                pheasant::socket::SocketType::Stream,
                pheasant::socket::ProtocolNumber::Tcp,
            )
            .map_err(|_| err_stt!(500))?;
            let mut sockk: pheasant::socket::Socket<pheasant::socket::SockAddrIn> =
                sockk.init("127.0.0.1:6680".try_into().map_err(|_| err_stt!(500))?);

            pheasant::socket::SetSockOpts::new(sockk.fd())
                .reuse_address(true)
                .map_err(|_| err_stt!(500))?
                .reuse_port(true)
                .map_err(|_| err_stt!(500))?;
            sockk.bind().map_err(|e| {
                println!("{:?}", e);
                err_stt!(500)
            })?;
            println!("0");

            println!("===>> {:?} \n\n {:?}", sockk, addr);

            let addr = addr.try_into().map_err(|_| err_stt!(500))?;
            println!("{:?} \n\n {:?}", sockk, addr);
            sockk.connect(&addr).map_err(|err| {
                println!("{:?}", err);
                err_stt!(500)
            })?;
            let mut buf = [0u8; 4096];
            let req = req.into();
            println!("1");
            let mut resp =
                GateWay::service(&mut sockk, req, &mut buf).map_err(|_| err_stt!(500))?;
            println!("2");

            server
                .write(client.fd(), &mut resp)
                .map_err(|_| err_stt!(500))?;
            println!("3");
            client.shutdown_readwrite().map_err(|_| err_stt!(500))?;
            sockk.shutdown_readwrite().map_err(|_| err_stt!(500))?;
            sockk.close().map_err(|_| err_stt!(500))?;
            println!("4");

            continue;
        }

        let service = match lookup(&req.path_str()) {
            Err(err) => {
                http_error(err, &mut resp);
                server
                    .write(client.fd(), &mut resp)
                    .map_err(|_| err_stt!(500))?;

                continue;
            }
            Ok(service) => service,
        };

        if let Err(err) = server.service(req, &mut resp, service).await {
            http_error(err, &mut resp);
            server
                .write(client.fd(), &mut resp)
                .map_err(|_| err_stt!(500))?;

            continue;
        }
        print_resp(&resp);

        server
            .write(client.fd(), &mut resp)
            .map_err(|_| err_stt!(500))?;

        client.shutdown_readwrite().map_err(|_| err_stt!(500))?;
    }

    Ok(())
}
