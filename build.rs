use sqlite;
use std::{fs, path::Path};

fn main() -> Result<(), std::io::Error> {
    let data = Path::new("data");
    if data.is_file() || data.is_symlink() {
        panic!("a file named data already exists in the current dir");
    } else if !data.exists() {
        fs::create_dir("data")?;
    }

    let db = Path::new("data/main.db3");
    match db {
        db if db.is_file() => {
            let conn = sqlite::open("data/main.db3").unwrap();
            let mut statement = conn.prepare(LOOKUP).unwrap();
            statement.bind((1, "users")).unwrap();

            match statement.next() {
                // failed to get statement result
                Err(err) => panic!("{}", err),
                // first result is done, means table was not found
                Ok(sqlite::State::Done) => conn.execute(CREATE).unwrap(),
                // table was found
                Ok(sqlite::State::Row) => {
                    if statement.read::<String, _>("name").unwrap().as_str() != "name" {
                        panic!("column 'name' was not found in the 'users' table");
                    }
                    statement.next().unwrap();
                    if statement.read::<String, _>("name").unwrap().as_str() != "password" {
                        panic!("column 'password' was not found in the 'users' table");
                    }
                }
            }
        }
        // db exists but is not a file
        db if db.is_symlink() || db.is_dir() => {
            panic!(
                "the file 'master.db3' already exists in path 'data/master.db3', either as a dir or as a symlink."
            )
        }
        db if !db.exists() => {
            let conn = sqlite::open("data/main.db3").unwrap();
            conn.execute(CREATE).unwrap();
        }
        _ => (),
    }

    Ok(())
}

const LOOKUP: &str = "PRAGMA table_info('?')";

const CREATE: &str = "CREATE TABLE users (name TEXT, password TEXT);";
