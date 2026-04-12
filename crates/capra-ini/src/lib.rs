//! the program needs 2 configs
//! - the user configs stored in the database and controllable by the user
//! - the server configs stored in the config.ini file and accessed by the admin/server owner

pub mod parse;
pub mod server_config;
pub mod user_config;
