use capra_ini::configs::ServerConfig;
use capra_ini::parse::Parse;

fn main() -> Result<(), &'static str> {
    let configs = std::fs::read("config.ini").map_err(|_| "file probably not there")?;
    let configs = ServerConfig::parse(&configs).map_err(|_| "parse error")?;
    println!("{:#?}", configs);

    Ok(())
}
