use pheasant::prologue::{ErrorStatus, Protocol, err_stt, server::Respond, status};
use pheasant::services::{
    GateWay, Server, http_error,
    print::server::{print_req, print_resp},
    request,
    socket::server::Socket,
};

mod services;
use services::lookup;

#[derive(Debug)]
enum Error {
    ServerMishap,
    ServerBroken,
    ServerUninit,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let mut socket = Socket::builder("127.0.0.1:6680")
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
        if let Some(addr) =
            GateWay::route(services::gateway_router, &req.path_str()).map_err(|_| err_stt!(500))?
        {
            let mut ssock =
                pheasant::services::socket::client::Socket::new(4096).map_err(|_| err_stt!(500))?;
            ssock.connect(addr).map_err(|_| err_stt!(500))?;
            let req: pheasant::prologue::client::Request = req.into();
            println!(
                "{:?}",
                str::from_utf8(&req.stream_bytes().into_iter().collect::<Vec<u8>>())
            );
            let mut resp = GateWay::service(&mut ssock, req)
                .map_err(|_| err_stt!(500))?
                .into();
            println!(">{:?}<", resp);

            server
                .write(client.fd(), &mut resp)
                .map_err(|_| err_stt!(500))?;

            client.shutdown_readwrite().map_err(|_| err_stt!(500))?;

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
