use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt;

#[cfg(feature = "emulator")]
const FIRESTORE_URL: &str =
    "http://localhost:8080/v1/projects/pastify-app/databases/(default)/documents/pastes";

#[cfg(not(feature = "emulator"))]
const FIRESTORE_URL: &str =
    "https://firestore.googleapis.com/v1/projects/pastify-app/databases/(default)/documents/pastes";

#[derive(Debug, thiserror::Error)]
pub enum PastifyError {
    #[error("{0}")]
    ReqwestError(
        #[source]
        #[from]
        reqwest::Error,
    ),
    #[error("{0}")]
    FirestoreError(#[from] FirestoreError),
}

#[derive(Debug, thiserror::Error, Deserialize)]
#[error("{message}")]
pub struct FirestoreError {
    pub code: u16,
    pub message: String,
    pub status: String,
}

#[derive(Debug, Deserialize)]
struct FirestoreErrorOuter {
    error: FirestoreError,
}

#[derive(Serialize, Deserialize)]
pub struct PasteFields {
    content: HashMap<String, String>,
    #[serde(rename = "createdBy")]
    created_by: HashMap<String, Option<String>>,
}

const STRING_VALUE: &str = "stringValue";
const NULL_VALUE: &str = "nullValue";

impl PasteFields {
    pub fn content(&self) -> &str {
        self.content.get(STRING_VALUE).unwrap().as_str()
    }

    pub fn created_by(&self) -> Option<&str> {
        self.created_by
            .get(STRING_VALUE)
            .map(|it| it.as_ref().unwrap().as_str())
    }
}

impl fmt::Debug for PasteFields {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.debug_struct("Fields")
            .field("content", &self.content())
            .field("created_by", &format!("{:?}", self.created_by()))
            .finish()
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PasteDocument {
    #[serde(skip_serializing)]
    name: String,
    pub fields: PasteFields,
    #[serde(rename = "createTime")]
    #[serde(skip_serializing)]
    pub create_time: String,
    #[serde(rename = "updateTime")]
    #[serde(skip_serializing)]
    update_time: String,
}

impl PasteDocument {
    pub fn id(&self) -> String {
        self.name.replace(
            "projects/pastify-app/databases/(default)/documents/pastes/",
            "",
        )
    }
}

pub async fn get(id: &str) -> Result<PasteDocument, PastifyError> {
    let resp = reqwest::get(format!("{}/{}", FIRESTORE_URL, id)).await?;
    if resp.status().is_success() {
        Ok(resp.json().await?)
    } else {
        let error = resp.json::<FirestoreErrorOuter>().await?;
        Err(PastifyError::FirestoreError(error.error))
    }
}

pub async fn create(content: &str) -> Result<PasteDocument, PastifyError> {
    let doc = PasteDocument {
        name: String::new(),
        fields: PasteFields {
            content: {
                let mut map = HashMap::with_capacity(1);
                map.insert(STRING_VALUE.to_string(), content.to_string());
                map
            },
            created_by: {
                let mut map = HashMap::with_capacity(1);
                map.insert(NULL_VALUE.to_string(), None);
                map
            },
        },
        create_time: String::new(),
        update_time: String::new(),
    };

    let resp = reqwest::Client::new()
        .post(FIRESTORE_URL)
        .json(&doc)
        .send()
        .await?;

    if resp.status().is_success() {
        Ok(resp.json().await?)
    } else {
        let error = resp.json::<FirestoreErrorOuter>().await?;
        Err(PastifyError::FirestoreError(error.error))
    }
}


#[cfg(test)]
#[cfg(feature = "emulator")] // don't test using prod db
mod tests {
    use super::*;

    #[tokio::test]
    async fn get_works() {
        let doc = create("fuck").await.unwrap();
        let get = get(&doc.id()).await.unwrap();
        assert_eq!(get.fields.content(), "fuck")
    }

    #[tokio::test]
    async fn create_works() {
        let get = create("UL9ohbDcKXlspF02Yo1H").await.unwrap();
        assert_eq!(get.fields.content(), "UL9ohbDcKXlspF02Yo1H")
    }
}
