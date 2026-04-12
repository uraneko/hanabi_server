use super::Error;
use super::dirs::Dir;
use rusqlite::{Connection, types::Type};
use std::collections::HashMap;
use std::path::Path;

// #[derive(Debug, Clone)]
// pub enum Error {
//     FailedToOpenDB,
//     FailedToProcessQueryRow,
//     TableNotFound,
//     FailedToDropTable,
//     TableCreateFailed,
//     TableColumnsMismatch,
//     InvalidConversionStr,
// }

#[derive(Debug, Default, PartialEq, Eq, Clone)]
pub struct TableLayout<'a> {
    columns: HashMap<&'static str, ColumnOptions<'a>>,
}

impl<'a> TableLayout<'a> {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_columns(i: impl IntoIterator<Item = (&'static str, ColumnOptions<'a>)>) -> Self {
        Self {
            columns: HashMap::from_iter(i.into_iter()),
        }
    }

    pub fn column(&mut self, key: &'static str, opts: ColumnOptions<'a>) -> &mut Self {
        self.columns.insert(key, opts);

        self
    }

    pub fn columns(
        &mut self,
        i: impl IntoIterator<Item = (&'static str, ColumnOptions<'a>)>,
    ) -> &mut Self {
        self.columns.extend(i);

        self
    }

    pub fn column_names(&self) -> Vec<&'static str> {
        self.columns.keys().map(|k| *k).collect()
    }

    pub fn sql(&self) -> String {
        let mut foreigns = String::new();
        let sql = self
            .columns
            .iter()
            .map(|(col, opts)| {
                if let Some(decl) = opts.foreign_key_declaration(col) {
                    foreigns.push_str(&decl);
                    foreigns.push(',');
                }

                opts.sql(col)
            })
            .reduce(|acc, col| acc + ", " + &col)
            .unwrap_or_default();

        if foreigns.is_empty() {
            return sql;
        }

        foreigns.pop();
        format!("{}, {}", sql, foreigns)
    }
}

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct ColumnOptions<'a> {
    /// column values must be unique from each other
    unique: bool,
    /// column values can be null
    nullable: bool,
    /// is primary key
    pk: bool,
    /// is foreign key
    fk: Option<[&'a str; 2]>,
    // sqlite type of the column
    type_: Type,
}

impl Default for ColumnOptions<'_> {
    fn default() -> Self {
        Self {
            unique: true,
            nullable: false,
            pk: false,
            fk: None,
            type_: Type::Integer,
        }
    }
}

impl<'a> TryFrom<&'a str> for ColumnOptions<'a> {
    type Error = Error;

    fn try_from(s: &'a str) -> Result<Self, Self::Error> {
        let mut chunks = s.split('|');
        let Some(ty) = chunks.next() else {
            return Err(Error::DbInvalidConversionStr);
        };
        let type_ = sqlite_type_from_str(ty)?;
        let mut unique = false;
        let mut nullable = true;
        let mut pk = false;
        let mut fk = None;
        for chunk in chunks {
            update_column_option_from_str(chunk, &mut unique, &mut nullable, &mut pk, &mut fk)?
        }

        Ok(Self {
            type_,
            unique,
            nullable,
            pk,
            fk,
        })
    }
}

fn update_column_option_from_str<'a>(
    s: &'a str,
    unique: &mut bool,
    nullable: &mut bool,
    pk: &mut bool,
    foreign: &mut Option<[&'a str; 2]>,
) -> Result<(), Error> {
    match s {
        "u" => *unique = true,
        "nn" => *nullable = false,
        "pk" => *pk = true,
        fk if fk.starts_with("foreign(") => *foreign = Some(parse_foreign_key(fk)?),
        _ => return Err(Error::DbInvalidConversionStr),
    }

    Ok(())
}

// foreign(ftname[fcname])
fn parse_foreign_key(s: &str) -> Result<[&str; 2], Error> {
    let Some(obracket) = s.chars().position(|ch| ch == '[') else {
        return Err(Error::DbInvalidConversionStr);
    };
    let table = &s[8..obracket];
    let Some(cbracket) = s.chars().position(|ch| ch == ']') else {
        return Err(Error::DbInvalidConversionStr);
    };
    let column = &s[obracket + 1..cbracket];

    Ok([table, column])
}

fn sqlite_type_from_str(s: &str) -> Result<Type, Error> {
    Ok(match s {
        "int" => Type::Integer,
        "null" => Type::Null,
        "real" => Type::Real,
        "text" => Type::Text,
        "blob" => Type::Blob,
        _ => return Err(Error::DbInvalidConversionStr),
    })
}

impl<'a> ColumnOptions<'a> {
    pub fn new(type_: Type) -> Self {
        Self {
            type_,
            ..Default::default()
        }
    }

    pub fn foreign_key_declaration(&self, column_name: &str) -> Option<String> {
        self.fk.map(|[ft, fc]| {
            return format!("foreign key({}) references {}({})", column_name, ft, fc);
        })
    }

    pub fn sql(&self, s: &str) -> String {
        let mut s = s.to_owned();

        s.push(' ');
        s.push_str(&self.type_.to_string());

        if self.pk {
            s.push_str(" primary key");
        }
        if !self.nullable {
            s.push_str(" not null");
        }
        if self.unique {
            s.push_str(" unique");
        }

        s
    }
}

// table either
// exists with the right columns -> do nothing
// doesnt exist -> make it
// exists with wrong columns -> remove it then make it anew | fix the columns
#[derive(Debug, Default, PartialEq, Eq, Clone, Hash)]
pub struct TableOptions {
    // make a new table using the layout iff it doesnt exist
    make: bool,
    // check if the table exists with the corrent layout
    // usually true, unless you know for a fact the table doesnt exist
    check: bool,
    // discard the existing table if any, and make a new one in case the check fails
    remake: bool,
}

impl TableOptions {
    pub fn new() -> Self {
        Default::default()
    }

    pub fn make(&mut self, make: bool) -> &mut Self {
        self.make = make;
        self
    }

    pub fn check(&mut self, check: bool) -> &mut Self {
        self.check = check;
        self
    }

    pub fn remake(&mut self, remake: bool) -> &mut Self {
        self.remake = remake;
        self
    }
}

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Table<'a> {
    name: &'static str,
    layout: TableLayout<'a>,
    options: TableOptions,
}

impl<'a> Table<'a> {
    pub fn new(name: &'static str, layout: TableLayout<'a>, options: TableOptions) -> Self {
        Self {
            name,
            layout,
            options,
        }
    }

    pub fn drop_from_db(&self, conn: &Connection) -> Result<(), Error> {
        conn.execute(&["drop table ", self.name].concat(), [])
            .map_err(|_| Error::DbFailedToDropTable)
            .map(|_| ())
    }

    pub fn check_columns(&self, conn: &Connection) -> Result<(), Error> {
        if !conn
            .prepare(&["select * from ", self.name, " limit 0"].concat())
            .map(|stt| {
                let slice = self.layout.column_names();
                let cols = stt.column_names();

                cols.iter().all(|c| slice.contains(c)) && slice.iter().all(|c| cols.contains(c))
            })
            .map_err(|_| Error::DbFailedToProcessQueryRow)?
        {
            return Err(Error::DbTableColumnsMismatch);
        }

        Ok(())
    }

    pub fn check(&self, tables: &[String]) -> Result<(), Error> {
        // let sql = [
        //     "select name from sqlite_master where type='table' and name='",
        //     self.name,
        //     "';",
        // ]
        // .concat();
        // println!(">>ct<< {}", sql);
        // let table_name: String = conn
        //     .query_row(&sql, [], |row| row.get(0))
        //     .map_err(|_| Error::FailedToProcessQueryRow)?;
        //
        // if table_name.as_str() != self.name {
        //     return Err(Error::TableNotFound);
        // }

        if !tables.contains(&self.name.to_owned()) {
            return Err(Error::DbTableNotFound);
        }

        Ok(())
    }

    pub fn sql(&self) -> String {
        [
            "create table ",
            self.name,
            " (",
            &self.layout.sql(),
            ") strict;",
        ]
        .concat()
    }

    pub fn make(&self, conn: &Connection) -> Result<String, Error> {
        conn.execute(&self.sql(), [])
            .map_err(|err| {
                println!("{:?}", err);
                Error::DbTableCreateFailed
            })
            .map(|_| self.name.to_owned())
    }
}

#[derive(Debug)]
pub struct Database<'a> {
    conn: Connection,
    tables: Vec<Table<'a>>,
    state: Vec<String>,
}

fn get_db_tables(conn: &Connection) -> Result<Vec<String>, Error> {
    conn.prepare("select name from sqlite_master where type='table';")
        .map_err(|_| Error::DbFailedToProcessQueryRow)?
        .query([])
        .map_err(|_| Error::DbFailedToProcessQueryRow)?
        .mapped(|row| row.get::<usize, String>(0))
        .collect::<Result<Vec<String>, _>>()
        .map_err(|_| Error::DbFailedToProcessQueryRow)
}

impl<'a> Database<'a> {
    // NOTE `Connection::open` creates a new db if it doesnt exist
    pub fn new(path: impl AsRef<Path>) -> Result<Self, Error> {
        let conn = Connection::open(path).map_err(|_| Error::DbFailedToOpenDB)?;
        let state: Vec<String> = get_db_tables(&conn)?;
        Ok(Self {
            conn,
            state,
            tables: Vec::new(),
        })
    }

    pub fn with_tables(
        path: impl AsRef<Path>,
        tables: impl IntoIterator<Item = Table<'a>>,
    ) -> Result<Self, Error> {
        let conn = Connection::open(path).map_err(|_| Error::DbFailedToOpenDB)?;
        let state = get_db_tables(&conn)?;

        Ok(Self {
            // NOTE `Connection::open` creates a new db if it doesnt exist
            tables: Vec::from_iter(tables.into_iter()),
            conn,
            state,
        })
    }

    pub fn push_state(&mut self, state: String) {
        self.state.push(state);
    }

    pub fn check(&mut self) -> Result<(), Error> {
        let mut state = core::mem::take(&mut self.state);

        let res = self
            .tables
            .iter()
            .map(|t| {
                if !t.options.check {
                    return Ok(());
                }
                // println!("checking table");

                match t.check(&state) {
                    Ok(_) => (),
                    e @ Err(Error::DbTableNotFound) => {
                        if t.options.make {
                            let name = t.make(&self.conn)?;
                            state.push(name);
                        } else {
                            return e;
                        }
                    }
                    _ => unreachable!("fn returns either ok or err:tablenotfound"),
                }
                // println!("checked table existence");

                match t.check_columns(&self.conn) {
                    Ok(()) => (),
                    e @ Err(Error::DbTableColumnsMismatch) => {
                        if t.options.remake {
                            t.drop_from_db(&self.conn)?;
                            t.make(&self.conn)?;
                        } else {
                            return e;
                        }
                    }
                    err => return err,
                }
                // println!("checked table columns");

                Ok(())
            })
            .collect();
        self.state = core::mem::take(&mut state);

        res
    }
}

#[derive(Debug)]
pub struct DbPipeline<'a> {
    dir: Dir,
    databases: Vec<Database<'a>>,
}

impl<'a> DbPipeline<'a> {
    pub fn new(dir: Dir) -> Self {
        Self {
            dir,
            databases: Vec::new(),
        }
    }

    pub fn with_dbs(dir: Dir, dbs: impl IntoIterator<Item = Database<'a>>) -> Self {
        Self {
            dir,
            databases: Vec::from_iter(dbs.into_iter()),
        }
    }

    pub fn database(&mut self, db: Database<'a>) -> &mut Self {
        self.databases.push(db);

        self
    }

    pub fn check_dir(&self) -> Result<(), Error> {
        match self.dir.is_dir() {
            e @ Err(Error::DirsDirIsNoDir) => return e,
            Err(Error::DirsDirNotFound) => self.dir.make(),
            ok @ Ok(()) => return ok,
            _ => unreachable!("function doesnt return this variant"),
        }
    }

    pub fn build(mut self) -> Result<(), Error> {
        self.check_dir()?;
        self.databases.iter_mut().map(|db| db.check()).collect()
    }
}
