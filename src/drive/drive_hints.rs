use fs4::{available_space, free_space, total_space};
use pheasant_core::get;

use super::{BytesUnit, ReadableBytes};

#[get("drive/drive_hints")]
pub async fn drive_hints(_: ()) -> Vec<u8> {
    let free = available_space(".").unwrap();
    let free = ReadableBytes::new(free);
    let total = total_space(".").unwrap();
    let total = ReadableBytes::new(total);

    let dh: DriveHints = [total, free].into();
    println!("{:#?}", dh);

    serde_json::to_string(&dh).unwrap().into_bytes()
}

#[derive(Debug, Clone, Copy, PartialEq, serde::Serialize)]
struct DriveHints {
    total: f64,
    available: f64,
    unit: BytesUnit,
}

impl From<[ReadableBytes; 2]> for DriveHints {
    fn from(vals: [ReadableBytes; 2]) -> Self {
        Self {
            total: vals[0].as_float(),
            available: vals[1].as_float(),
            unit: vals[0].unit(),
        }
    }
}
