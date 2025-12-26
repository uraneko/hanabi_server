use sqlite::Connection;
use std::{fs, path::Path};

fn main() -> Result<(), Error> {
    match check_dir() {
        Err(Error::DataIsNotADir) => panic!("data already exists and is not a dir"),
        Err(Error::DataDirNotFound) => make_dir()?,
        Ok(()) => (),
        _ => unreachable!("function doesnt return this variant"),
    }
    let conn = open_database()?;
    match check_table(&conn) {
        Ok(()) => (),
        Err(Error::FailedToProcessQueryRow) => panic!("internal error; db query processing failed"),
        Err(Error::TableNotFound) => make_table(&conn)?,
        _ => unreachable!("function doesnt return this variant"),
    }

    check_columns(&conn)?;

    Ok(())
}

const LOOKUP: &str = "PRAGMA table_info(users)";

const CREATE: &str = "CREATE TABLE users (name TEXT, password TEXT);";

#[derive(Debug)]
enum Error {
    FailedToCreateDataDir,
    FailedToOpenDB,
    FailedToProcessQueryRow,
    TableNotFound,
    TableCreateFailed,
    TableColumnsMismatch,
    DataDirNotFound,
    DataIsNotADir,
}

fn check_dir() -> Result<(), Error> {
    let path = Path::new("data");
    if path.is_file() || path.is_symlink() {
        return Err(Error::DataIsNotADir);
    } else if !path.exists() {
        return Err(Error::DataDirNotFound);
    }

    Ok(())
}

fn make_dir() -> Result<(), Error> {
    fs::create_dir("data").map_err(|_| Error::FailedToCreateDataDir)
}

// creates a new db if it doesnt exist
fn open_database() -> Result<Connection, Error> {
    sqlite::open("data/main.db3").map_err(|_| Error::FailedToOpenDB)
}

fn check_table(conn: &Connection) -> Result<(), Error> {
    let mut stt = conn
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users';")
        .map_err(|_| Error::FailedToProcessQueryRow)?;
    stt.next().map_err(|_| Error::FailedToProcessQueryRow)?;

    match stt.read::<String, _>("name") {
        Ok(val) if val == "users".to_owned() => (),
        _ => return Err(Error::TableNotFound),
    }

    Ok(())
}

fn make_table(conn: &Connection) -> Result<(), Error> {
    conn.execute("CREATE TABLE users (name TEXT, password TEXT);")
        .map_err(|_| Error::TableCreateFailed)
}

fn check_columns(conn: &Connection) -> Result<(), Error> {
    let mut stt = conn
        .prepare("select * from users limit 0")
        .map_err(|_| Error::FailedToProcessQueryRow)?;
    stt.next().map_err(|_| Error::FailedToProcessQueryRow)?;

    if stt.column_names() != &["name".to_owned(), "password".into()] {
        return Err(Error::TableColumnsMismatch);
    }

    Ok(())
}
