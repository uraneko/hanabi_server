use std::fs::read_dir;

use pheasant_core::get;

use super::{DrivePath, Node, read_paths_from_str};

#[get("/drive/file_tree")]
#[mime("application/json")]
pub async fn file_tree(path: DrivePath) -> Vec<u8> {
    let tree = FileTree::new(&path.0);
    println!("{:#?}", tree);

    serde_json::to_string(&tree).unwrap().into_bytes()
}

#[derive(Debug, Default, Clone, PartialEq, serde::Serialize)]
struct FileTree {
    nodes: Vec<Vec<String>>,
    dirs: Vec<Dir>,
}

#[derive(Debug, Clone, PartialEq, serde::Serialize)]
struct Dir {
    path: String,
    idx: usize,
}

const ERROR: &str = "����� ";

impl FileTree {
    fn new(p: &str) -> Self {
        let mut tree = Self::default();
        tree.branch_walk(p);

        tree
    }

    // WARN trash performance
    fn branch_walk(&mut self, p: &str) {
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

        let idx = self.nodes.len();
        self.nodes
            .push(dir.clone().into_iter().map(|(p, _)| p).collect());

        dir.clone()
            .into_iter()
            .filter(|(p, is_dir)| *is_dir)
            .for_each(|(p, d)| self.branch_walk(&p));

        let d = Dir {
            path: p.to_owned(),
            idx,
        };

        self.dirs.push(d);
    }
}
