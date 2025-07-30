use pheasant_core::Request;

pub mod file_hints;
pub mod read_dir;

pub use file_hints::{FileHints, file_hints};
pub use read_dir::read_dir;
pub use read_dir::read_paths_from_str;

// TODO base, path
pub struct DrivePath(String);
impl From<Request> for DrivePath {
    fn from(req: Request) -> Self {
        Self(req.param("path").unwrap().into())
    }
}

pub enum Node {
    Dir(String),
    File(String),
    SymLink(String),
    Error,
}

impl Node {
    const Err: &str = "����� ";

    fn as_str(&self) -> &str {
        match self {
            Self::Dir(p) | Self::File(p) | Self::SymLink(p) => p,
            // fs::read would return an error on this
            Self::Error => Self::Err,
        }
    }
}

fn read_entry_to_string(e: Result<std::fs::DirEntry, std::io::Error>) -> String {
    let Ok(e) = e else {
        return Node::Err.to_string();
    };

    let ftype = e.file_type().unwrap();
    if ftype.is_dir() || ftype.is_file() || ftype.is_symlink() {
        e.path().to_string_lossy().into()
    } else {
        Node::Err.to_owned()
    }
}

fn read_entry_to_node(e: std::fs::DirEntry) -> Node {
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
