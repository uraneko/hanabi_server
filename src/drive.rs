use pheasant::Request;
use std::fs::DirEntry;
use std::io::Error as IOError;
use std::path::Path;

mod byte_units;
pub mod download;
pub mod drive_hints;
pub mod file_hints;
pub mod file_tree;
pub mod read_dir;
pub mod view;

use byte_units::*;
pub use download::{download, upload};
pub use drive_hints::drive_hints;
pub use file_hints::{FileHints, file_hints};
pub use file_tree::file_tree;
pub use read_dir::read_dir;
pub use view::view;

// TODO base, path
pub struct DrivePath(String);
impl From<&Request> for DrivePath {
    fn from(req: &Request) -> Self {
        Self(req.param("path").unwrap().into())
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, serde::Serialize)]
pub enum Node {
    Dir(String),
    File(String),
    SymLink(String),
    Error,
}

impl Node {
    const ERROR: &str = "����� ";

    fn as_str(&self) -> &str {
        match self {
            Self::Dir(p) | Self::File(p) | Self::SymLink(p) => p,
            // fs::read would return an error on this
            Self::Error => Self::ERROR,
        }
    }

    fn is_dir(&self) -> bool {
        let Self::Dir(_) = self else { return false };

        true
    }
}

fn has_extension(s: &str) -> bool {
    !(s.is_empty())
        && !(s.contains('.'))
        && !(s.starts_with('.') && s.chars().filter(|c| c == &'.').count() == 1)
}

impl From<&Path> for Node {
    fn from(p: &Path) -> Self {
        if p.is_dir() {
            Node::Dir(p.to_str().unwrap().to_owned())
        } else if p.is_file() {
            Node::File(p.to_str().unwrap().to_owned())
        } else if p.is_symlink() {
            Node::SymLink(p.to_str().unwrap().to_owned())
        } else {
            Node::Error
        }
    }
}

// NOTE this can always be unwrapped safely
impl std::str::FromStr for Node {
    type Err = ();

    fn from_str(s: &str) -> Result<Node, Self::Err> {
        let p = Path::new(s);

        Ok(p.into())
    }
}

fn read_entry_to_string(e: Result<std::fs::DirEntry, std::io::Error>) -> String {
    let Ok(e) = e else {
        return Node::ERROR.to_string();
    };

    let ftype = e.file_type().unwrap();
    if ftype.is_dir() || ftype.is_file() || ftype.is_symlink() {
        e.path().to_string_lossy().into()
    } else {
        Node::ERROR.to_owned()
    }
}

impl From<Result<DirEntry, std::io::Error>> for Node {
    fn from(res: Result<DirEntry, IOError>) -> Self {
        let Ok(e) = res else {
            return Node::Error;
        };

        e.into()
    }
}

impl From<DirEntry> for Node {
    fn from(e: DirEntry) -> Self {
        let ftype = e.file_type().unwrap();
        let path: String = e.path().to_string_lossy().into();
        if ftype.is_dir() {
            Node::Dir(path)
        } else if ftype.is_file() {
            Node::File(path)
        } else if ftype.is_symlink() {
            Node::SymLink(path)
        } else {
            Node::Error
        }
    }
}
