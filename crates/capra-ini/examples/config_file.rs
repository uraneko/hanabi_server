use capra_ini::configs::ServerConfig;
use capra_ini::parse::{AnalyzeSemantics, AnalyzeSyntax, Error, Lex, Parse, parse_vec};
use capra_ini::parse::{Attribute, Component, Property, Section};
use core::iter::Peekable;
use std::collections::HashMap;

fn main() -> Result<(), &'static str> {
    let configs = std::fs::read("config.ini").map_err(|_| "file probably not there")?;
    let configs = ServerConfig::parse(&configs).map_err(|_| "parse error")?;
    println!("{:#?}", configs);

    Ok(())
}
