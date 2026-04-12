use capra_ini::parse::Parse;
use capra_ini::server_config::ServerConfig;

fn main() -> Result<(), &'static str> {
    let configs = std::fs::read("config.ini").map_err(|_| "file probably not there")?;
    let configs = ServerConfig::parse(&configs).map_err(|_| "parse error")?;
    let configs = configs.stream().into_iter().collect::<Vec<u8>>();
    println!("{}", unsafe { str::from_utf8_unchecked(&configs) });

    Ok(())
}
