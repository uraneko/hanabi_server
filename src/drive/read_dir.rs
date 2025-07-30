use pheasant_core::get;

use super::{DrivePath, FileHints, read_entry_to_string};

#[get("/drive/read_dir")]
#[mime("application/json")]
pub async fn read_dir(p: DrivePath) -> Vec<u8> {
    let dir = &Directory::new(&p.0);
    println!("{:#?}", dir);

    serde_json::to_string(dir).unwrap().into_bytes()
}

#[derive(Debug, Clone, PartialEq, serde::Serialize)]
pub struct Directory(Vec<FileHints>);

impl Directory {
    pub fn new(path: &str) -> Self {
        let dir = std::fs::read_dir(path).unwrap();

        Self(read_annotated_from_iter(dir))
    }
}

pub fn read_annotated_from_iter(
    entries: impl Iterator<Item = Result<std::fs::DirEntry, std::io::Error>>,
) -> Vec<FileHints> {
    entries
        .map(|e| read_entry_to_string(e))
        .map(|p| FileHints::new(&p))
        .collect()
}

pub fn read_annotated_from_str(path: &str) -> Vec<FileHints> {
    read_annotated_from_iter(std::fs::read_dir(path).unwrap())
}

pub fn read_paths_from_iter(
    entries: impl Iterator<Item = Result<std::fs::DirEntry, std::io::Error>>,
) -> Vec<String> {
    entries.map(|e| read_entry_to_string(e)).collect()
}

pub fn read_paths_from_str(path: &str) -> Vec<String> {
    read_paths_from_iter(std::fs::read_dir(path).unwrap())
}
