use rocket::{get, post};
use rocket::http::Status;
use rocket_contrib::json::{json, Json, JsonValue};
use serde::{Deserialize, Serialize};
use crate::{errors, firestore};

#[get("/<id>")]
pub async fn get_raw_paste(id: &str) -> Result<String, Status> {
    let doc = firestore::get(id).await.map_err(errors::handle_pastify_error)?;
    Ok(doc.fields.content().to_string())
}

#[derive(Serialize, Deserialize)]
pub struct PasteRequest {
    content: String,
}

#[post("/paste", format = "json", data = "<paste>")]
pub async fn create_paste(paste: Json<PasteRequest>) -> Result<JsonValue, Status> {
    let doc = firestore::create(&paste.content)
        .await
        .map_err(errors::handle_pastify_error)?;
    Ok(json!({
        "id": doc.id(),
        "created_at": doc.create_time,
        "content": doc.fields.content(),
    }))
}
