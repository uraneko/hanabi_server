use std::{fs, path};

fn main() -> Result<(), std::io::Error> {
    if !path::Path::new("data").is_dir() {
        fs::create_dir("data")?;
    }

    Ok(())
}
