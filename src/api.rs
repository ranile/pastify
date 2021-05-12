use rocket::{launch, routes, get};

mod firestore;
#[path = "api/errors.rs"]
mod errors;
#[path = "api/routes.rs"]
mod routes;

use routes::{get_raw_paste, create_paste};
use rocket_contrib::templates::Template;
use rocket::http::Status;

#[get("/")]
pub fn index() -> Template {
    Template::render("index", std::collections::HashMap::<(), ()>::new())
}

#[derive(serde::Serialize)]
pub struct ShowContext<'a> {
    content: &'a str,
}

#[get("/<id>")]
pub async fn show(id: &str) -> Result<Template, Status> {
    let content = firestore::get(id).await.map_err(errors::handle_pastify_error)?;
    let content = content.fields.content();

    Ok(Template::render("show", ShowContext { content }))
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, show])
        .mount("/raw", routes![get_raw_paste])
        .mount("/api", routes![create_paste])
        .attach(Template::fairing())
}
