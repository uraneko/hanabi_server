// 1 TB = this many bytes
const TiB: u64 = u64::pow(1024, 4);
// 1 GB
const GiB: u64 = u64::pow(1024, 3);
// 1 MB
const MiB: u64 = u64::pow(1024, 2);
// 1 KB
const KiB: u64 = 1024;

// 1000 ** 4 bytes = 1 TB
// 10 b = 1 tb => 32 b = 3.2 tb <= 32 b / 10 b = 3.2 tb

pub enum ReadableBytes {
    TiB(f64),
    GiB(f64),
    MiB(f64),
    KiB(f64),
    Bytes(u64),
}

impl ReadableBytes {
    pub fn new(bytes: u64) -> Self {
        if bytes > TiB {
            Self::TiB(bytes as f64 / TiB as f64)
        } else if bytes > GiB {
            Self::GiB(bytes as f64 / GiB as f64)
        } else if bytes > MiB {
            Self::MiB(bytes as f64 / MiB as f64)
        } else if bytes > KiB {
            Self::KiB(bytes as f64 / KiB as f64)
        } else {
            Self::Bytes(bytes)
        }
    }

    pub fn as_float(&self) -> f64 {
        match self {
            Self::TiB(f) | Self::GiB(f) | Self::MiB(f) | Self::KiB(f) => *f,
            Self::Bytes(u) => *u as f64,
        }
    }

    pub fn as_int(&self) -> u64 {
        match self {
            Self::TiB(f) | Self::GiB(f) | Self::MiB(f) | Self::KiB(f) => *f as u64,
            Self::Bytes(u) => *u,
        }
    }

    pub fn unit(&self) -> BytesUnit {
        match self {
            Self::TiB(f) => "TiB",
            Self::GiB(f) => "GiB",
            Self::MiB(f) => "MiB",
            Self::KiB(f) => "KiB",
            Self::Bytes(u) => "B",
        }
        .try_into()
        .unwrap()
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, serde::Serialize)]
pub enum BytesUnit {
    TiB,
    GiB,
    MiB,
    KiB,
    B,
}

impl TryFrom<&str> for BytesUnit {
    type Error = ();

    fn try_from(s: &str) -> Result<Self, Self::Error> {
        match s {
            "TiB" => Ok(Self::TiB),
            "GiB" => Ok(Self::GiB),
            "MiB" => Ok(Self::MiB),
            "KiB" => Ok(Self::KiB),
            "B" => Ok(Self::B),
            _ => Err(()),
        }
    }
}

impl std::fmt::Display for ReadableBytes {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{} {}",
            self.as_int(),
            match self {
                Self::TiB(f) => "TiB",
                Self::GiB(f) => "GiB",
                Self::MiB(f) => "MiB",
                Self::KiB(f) => "KiB",
                Self::Bytes(u) => "B",
            }
        )
    }
}
