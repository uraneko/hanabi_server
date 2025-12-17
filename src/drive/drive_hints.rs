use fs4::{available_space, free_space, total_space};
use pheasant::{Request, get};

use super::{BytesUnit, ReadableBytes};

struct Truncated(bool);

impl std::ops::Deref for Truncated {
    type Target = bool;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<&Request> for Truncated {
    fn from(req: &Request) -> Self {
        Self(req.contains_attr("truncate"))
    }
}

#[get("/drive/drive_hints")]
#[mime("application/json")]
#[cors(headers = "Content-Type", origins = "*", methods = get)]
#[re("dh")]
pub async fn drive_hints(req: Request) -> Vec<u8> {
    let free = available_space(".").unwrap();
    let free = ReadableBytes::new(free);
    let total = total_space(".").unwrap();
    let total = ReadableBytes::new(total);
    let truncate_bytes: Truncated = (&req).into();

    if *truncate_bytes {
        let dh: DriveHintsInt = [total, free].into();
        let dh: DriveHintsIntUsed = dh.into();
        serde_json::to_string(&dh).unwrap().into_bytes()
    } else {
        let dh: DriveHints = [total, free].into();
        serde_json::to_string(&dh).unwrap().into_bytes()
    }
}

// TODO this whole module is a mess

#[derive(Debug, Clone, Copy, PartialEq, serde::Serialize)]
struct DriveHintsIntUsed {
    total: u64,
    t_unit: BytesUnit,
    used: u64,
    u_unit: BytesUnit,
}

impl From<DriveHintsInt> for DriveHintsIntUsed {
    fn from(dh: DriveHintsInt) -> Self {
        Self {
            total: dh.total,
            used: dh.total - dh.available,
            t_unit: dh.t_unit,
            u_unit: dh.a_unit,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, serde::Serialize)]
struct DriveHintsInt {
    total: u64,
    t_unit: BytesUnit,
    available: u64,
    a_unit: BytesUnit,
}

impl From<[ReadableBytes; 2]> for DriveHintsInt {
    fn from(vals: [ReadableBytes; 2]) -> Self {
        Self {
            total: vals[0].as_int(),
            t_unit: vals[0].unit(),
            available: vals[1].as_int(),
            a_unit: vals[1].unit(),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, serde::Serialize)]
struct DriveHints {
    total: f64,
    t_unit: BytesUnit,
    available: f64,
    a_unit: BytesUnit,
}

impl From<[ReadableBytes; 2]> for DriveHints {
    fn from(vals: [ReadableBytes; 2]) -> Self {
        Self {
            total: vals[0].as_float(),
            t_unit: vals[0].unit(),
            available: vals[1].as_float(),
            a_unit: vals[1].unit(),
        }
    }
}
