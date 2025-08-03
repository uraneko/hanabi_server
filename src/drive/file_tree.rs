use std::fs::read_dir;

use pheasant_core::{HeaderMap, Request, Response, get};

use super::{DrivePath, Node, read_paths_from_str};

pub struct FileTreeParams {
    path: String,
    ssr: bool,
    origin: String,
}

impl From<Request> for FileTreeParams {
    fn from(req: Request) -> Self {
        Self {
            path: req.param("path").unwrap_or(".").into(),
            ssr: req.has_param("ssr"),
            origin: req.header("Origin").unwrap_or("*".into()),
        }
    }
}

// TODO macro attrs
// cors(headers=pairs) attr, status(number) attr
#[get("/drive/file_tree")]
pub async fn file_tree(ftp: FileTreeParams) -> Response {
    let mut resp = Response::default();

    let tree = FileTreeWalker::walk(&ftp.path);
    if ftp.ssr {
        let ssr = tree.ssr();

        resp.set_header::<mime::Mime>("Content-Type", "text/html".parse().unwrap())
            .set_header("Access-Control-Allow-Origin", ftp.origin)
            .update_body(ssr.into_bytes());

        return resp;
    }

    resp.set_header::<mime::Mime>("Content-Type", "application/json".parse().unwrap())
        .set_header("Access-Control-Allow-Origin", ftp.origin)
        .update_body(serde_json::to_string(&tree).unwrap().into_bytes());

    resp
}

#[derive(Debug, Default, Clone, PartialEq, serde::Serialize)]
struct FileTreeWalker {
    dirs: Vec<Dir>,
    nodes: Vec<Vec<String>>,
}

#[derive(Debug, Default, Clone, PartialEq, serde::Serialize)]
struct FileTree {
    nodes: Vec<Vec<String>>,
    dirs: Vec<String>,
    base: String,
}

// TODO server has to set a cookie with base
// WARN this is all unsanitized
fn dir<D, N>(dirs: &mut D, nodes: &mut N, base: &str) -> String
where
    D: Iterator<Item = String>,
    N: Iterator<Item = Vec<String>>,
{
    let directory = dirs.next().unwrap();
    println!(">>>{}", directory);
    let nodes = nodes
        .next()
        .unwrap()
        .into_iter()
        .map(|node| {
            if std::path::Path::new(&format!("{}/{}", base, &node)).is_dir() {
                dir(dirs, nodes, base)
            } else {
                file(&node)
            }
        })
        .collect::<String>();

    format!(
        "
        <div class='dir'>
            <span>{directory}</span>
            <div class='entries'>
                {nodes}
            </div>
        </div>\n"
    )
}

fn file(file_name: &str) -> String {
    format!("<span>{file_name}</span>\n\t\t")
}

impl FileTree {
    // server side render the solid component html from this data
    fn ssr(self) -> String {
        let base = self.base;
        let mut dirs = self.dirs.into_iter();
        let mut nodes = self.nodes.into_iter();

        dir(&mut dirs, &mut nodes, &base)
    }
}

#[derive(Debug, Clone, PartialEq, serde::Serialize)]
struct Dir {
    path: String,
    idx: usize,
}

const ERROR: &str = "����� ";

impl FileTreeWalker {
    fn walk(p: &str) -> FileTree {
        let mut walker = Self::default();
        walker.branch_walk(p);
        walker.dirs.sort_by_key(|k| k.idx);

        let base = p.into();
        let nodes = walker
            .nodes
            .into_iter()
            .map(|nodes| {
                nodes
                    .into_iter()
                    .map(|node| node.trim_start_matches(&base).into())
                    .collect()
            })
            .collect();
        let dirs = walker
            .dirs
            .into_iter()
            .map(|d| {
                if d.path == p {
                    "/".into()
                } else {
                    d.path.trim_start_matches(&base).into()
                }
            })
            .collect();

        FileTree { nodes, dirs, base }
    }

    // WARN trash performance
    fn branch_walk(&mut self, p: &str) {
        // read all entries in dir + wether they are a dir or not
        let dir = read_dir(p)
            .unwrap()
            .map(|e| {
                if let Ok(e) = e {
                    (e.path().to_string_lossy().into(), e.path().is_dir())
                } else {
                    (ERROR.to_owned(), false)
                }
            })
            .collect::<Vec<(String, bool)>>();

        // index of the
        let idx = self.nodes.len();
        self.nodes
            .push(dir.clone().into_iter().map(|(p, _)| p).collect());

        dir.clone()
            .into_iter()
            .filter(|(_, is_dir)| *is_dir)
            .map(|(p, _)| p)
            .for_each(|p| self.branch_walk(&p));

        let d = Dir {
            path: p.to_owned(),
            idx,
        };

        self.dirs.push(d);
    }
}
