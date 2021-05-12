use crate::firestore::PastifyError;
use rocket::http::Status;

pub fn handle_pastify_error(error: PastifyError) -> Status {
    // todo handle error message
    match error {
        PastifyError::ReqwestError(e) => e
            .status()
            .map(|it| Status::from_code(it.as_u16()).unwrap())
            .unwrap_or(Status::InternalServerError),
        PastifyError::FirestoreError(error) => Status::from_code(error.code).unwrap(),
    }
}
