use capra_build::{
    Error,
    db::{Database, DbPipeline, Table, TableLayout, TableOptions},
    dirs::Dir,
    ui::UiPipeline,
};
use std::sync::LazyLock;

const DATA_PATH: &str = "data";
const MAIN_DB: &str = "data/main.db3";
const USERS_TABLE: LazyLock<Result<Table, Error>> = LazyLock::new(|| {
    let mut opts = TableOptions::new();
    opts.check(true).make(true);
    let layout = TableLayout::with_columns([
        ("name", "text|nn|pk".try_into()?),
        ("email", "blob|u".try_into()?),
        ("pswd", "blob|nn|u".try_into()?),
        ("salt", "text|nn|u".try_into()?),
        ("created", "int|nn".try_into()?),
    ]);

    Ok(Table::new("users", layout, opts))
});

const CONFIGS_TABLE: LazyLock<Result<Table, Error>> = LazyLock::new(|| {
    let mut opts = TableOptions::new();
    opts.check(true).make(true);
    let layout = TableLayout::with_columns([
        ("user", "text|nn|foreign(users[name])".try_into()?),
        ("configs", "blob|nn".try_into()?),
        ("pfp", "blob|u".try_into()?),
    ]);

    Ok(Table::new("configs", layout, opts))
});

const TOKENS_TABLE: LazyLock<Result<Table, Error>> = LazyLock::new(|| {
    let mut opts = TableOptions::new();
    opts.check(true).make(true);
    let layout = TableLayout::with_columns([
        ("user", "text|nn|foreign(users[name])".try_into()?),
        ("refresh", "blob|u".try_into()?),
        ("access", "blob|u".try_into()?),
    ]);

    Ok(Table::new("tokens", layout, opts))
});

fn main() -> Result<(), Error> {
    println!("cargo:rerun-if-changed=../../js/capra.client/capra*/src");
    let cargo_dir = Dir::new()?;
    let mut data_dir = cargo_dir.clone();
    data_dir.push(DATA_PATH);

    let users = USERS_TABLE.clone()?;
    let tokens = TOKENS_TABLE.clone()?;
    let configs = CONFIGS_TABLE.clone()?;
    let main_db = Database::with_tables(MAIN_DB, [users, tokens, configs]);
    let db = DbPipeline::with_dbs(data_dir, main_db);
    db.build()?;

    let js_dir = Dir::from_path("../../js/capra.client/capra");
    js_dir.goto()?;
    let ui = UiPipeline::new()
        .build(&["pnpm", "build"])
        .copy(["build", cargo_dir.as_str().unwrap()]);
    ui.update()?;
    cargo_dir.goto()?;

    Ok(())
}
