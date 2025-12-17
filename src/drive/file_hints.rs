use chrono::{DateTime, Utc};
use pheasant::get;
use std::fs::File;

use super::{BytesUnit, DrivePath, Node, ReadableBytes};

#[get("/drive/file_hints")]
#[mime("application/json")]
#[cors(headers = "Content-Type", origins = "*", methods = get)]
pub async fn file_hints(f: DrivePath) -> Vec<u8> {
    let hints = FileHints::new(&f.0);
    println!("{:#?}", hints);

    serde_json::to_string(&hints).unwrap().into_bytes()
}

#[derive(Debug, Clone, PartialEq, serde::Serialize, Copy)]
struct RawSVG<'a>(&'a [u8]);

impl<'a> RawSVG<'a> {
    // fn new(p: &str) -> Self {
    //     let p = format!("assets/{}", p);
    //
    //     Self(&std::fs::read(p).unwrap())
    // }
}

#[macro_use]
macro_rules! file_ext {
    ($($i: ident),*) => {
        #[non_exhaustive]
        #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, serde::Serialize)]
        enum FileExtension {
            $(
                $i,
            )*
        }

        impl std::str::FromStr for FileExtension {
            type Err = ();

            fn from_str(s: &str) -> Result<Self,Self::Err> {
                match &extension_formatted(s)[..] {
                    $(stringify!($i) => Ok(Self::$i) ,)*
                    _ => Err(()),
                }
            }
        }
    };
}

fn extension_formatted(s: &str) -> String {
    if s.is_empty() {
        return s.to_owned();
    }
    if s.starts_with(char::is_numeric) {
        format!("__{}", s)
    } else {
        let capi = char::to_uppercase(s.chars().next().unwrap());
        format!("{}{}", capi, &s[1..])
    }
}

file_ext!(
    Toml, Json, Py, Yaml, Md, Rs, Js, Css, Html, Txt, Zig, Pdf, Mobi, Epub, Docx, Pptx, Xlsx, Rar,
    Zip, __7z, Tar, Gzip, Jpeg, Jpg, Png, Gif, Svg, Mp3, Mp4
);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, serde::Serialize)]
enum FileKind {
    File,
    Dir,
    SymLink,
    Other,
}

impl FileKind {
    fn is_dir(&self) -> bool {
        let Self::Dir = self else { return false };

        true
    }

    fn is_file(&self) -> bool {
        let Self::File = self else { return false };

        true
    }
}

/// units are in bytes
#[derive(Debug, Default, Clone, Copy, PartialEq, serde::Serialize)]
struct FileSize {
    size: f64,
    unit: BytesUnit,
}

impl FileSize {
    fn null() -> Self {
        Self::default()
    }
}

impl From<ReadableBytes> for FileSize {
    fn from(b: ReadableBytes) -> Self {
        Self {
            size: b.as_float(),
            unit: b.unit(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, serde::Serialize)]
pub struct FileHints {
    // the extension of this file; e.g., .js, .rs, .txt, etc.
    ext: Option<FileExtension>,
    // the name of the file
    name: String,
    // size of file; if dir then sum of children size, if symlink then size of original
    size: FileSize,
    // when was it created
    // chrono datetime utc
    created: DateTime<Utc>,
    // last modified date
    modified: DateTime<Utc>,
    // last file access datetime
    accessed: DateTime<Utc>,
    // what kind of file; file | dir | symlink
    kind: FileKind,
    // if dir then how many children are there
    entries: Option<usize>,
    // the svg icon raw data of the file
    // icon: RawSVG<'a>,
}

// TODO add file name and file base path
impl FileHints {
    pub fn new(p: &str) -> Self {
        let Ok(f) = File::open(p) else {
            return Self::from_err();
        };

        let m = f.metadata().unwrap();

        let name = hints::name(&p);
        let kind = hints::kind(&m);
        let size = hints::size(&m, kind);
        let entries = hints::entries(p, kind);
        let ext = hints::extension(p, kind);
        let created = hints::created(&m);
        let modified = hints::modified(&m);
        let accessed = hints::accessed(&m);

        Self {
            name,
            kind,
            size,
            entries,
            ext,
            created,
            accessed,
            modified,
        }
    }

    // would have been better if new took Node
    pub fn from_err() -> Self {
        Self {
            name: Node::ERROR.to_owned(),
            kind: FileKind::File,
            size: FileSize::null(),
            created: Utc::now(),
            accessed: Utc::now(),
            modified: Utc::now(),
            entries: None,
            ext: None,
        }
    }
}

mod hints {
    use std::fs::Metadata;

    use chrono::{DateTime, Utc};

    use super::{FileExtension, FileKind, FileSize};

    pub(super) fn name(p: &str) -> String {
        let Some(start) = p.rfind('/') else {
            return p.to_owned();
        };

        p[start + 1..].to_owned()
    }

    // WARN BUG this returns None at all cases
    pub(super) fn extension(p: &str, k: FileKind) -> Option<FileExtension> {
        if k.is_dir() {
            return None;
        }
        let start = p.rfind('.')?;
        // accepts up to 12 chars long extensions
        if p.len() - start > 11 {
            return None;
        }
        let ext = &p[start + 1..];

        ext.parse::<FileExtension>().ok()
    }

    pub(super) fn size(m: &Metadata, _k: FileKind) -> FileSize {
        // TODO when kind is symlink, return original file size
        // TODO when kind is dir, return sum of all children sizes
        super::ReadableBytes::new(m.len()).into()
    }

    pub(super) fn kind(m: &Metadata) -> FileKind {
        m.file_type().into()
    }

    pub(super) fn entries(p: &str, k: FileKind) -> Option<usize> {
        if !k.is_dir() {
            return None;
        }

        Some(std::fs::read_dir(p).unwrap().count())
    }

    pub(super) fn created(m: &Metadata) -> DateTime<Utc> {
        // WARN this can crash with creation time is not available for the system
        let systime = m.created().unwrap();

        systime.into()
    }

    pub(super) fn modified(m: &Metadata) -> DateTime<Utc> {
        let systime = m.modified().unwrap();

        systime.into()
    }

    pub(super) fn accessed(m: &Metadata) -> DateTime<Utc> {
        let systime = m.accessed().unwrap();

        systime.into()
    }

    impl From<std::fs::FileType> for FileKind {
        fn from(ty: std::fs::FileType) -> Self {
            if ty.is_file() {
                Self::File
            } else if ty.is_dir() {
                Self::Dir
            } else if ty.is_symlink() {
                Self::SymLink
            } else {
                Self::Other
            }
        }
    }
}
