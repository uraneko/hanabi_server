use super::DrivePath;
use pheasant::get;

#[get("drive/view")]
#[mime("text/plain")]
#[re("view", "preview", "file_view", "file-view")]
#[cors(methods = get, origins = "*", headers = "Content-Type")]
pub async fn view(dp: DrivePath) -> Vec<u8> {
    std::fs::read(dp.0).unwrap_or(b"bad bad nano desu yo".to_vec())
}
