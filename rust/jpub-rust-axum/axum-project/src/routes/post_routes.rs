use axum::{
    routing::{post}, 
    extract::{Json, Form, Multipart},
    Router,
};

// async fn body(name: String) -> String {
//     format!("Hello, {}!", name)
// }

#[derive(serde::Deserialize)]
struct User {
    name: String,
}

async fn body(Json(user): Json<User>) -> String {
    format!("Hello, {}!", user.name)
}

// async fn get_video() -> StreamingResponse {
//     let files_byptes: Bytes = // load from disk

//     StreamingRespnse::new(file_bytes.map_err(create::errors::internal_error))
//         .header("Content-Type", "video/mp4")
//         .header("Content-Length"m, file_bytes.len())
// }

async fn form(Form(user): Form<User>) -> String {
    format!("Hello, {}!", user.name)
}

async fn upload(mut body: Multipart) -> String {
    if let Ok(Some(field)) = body.next_field().await {
        let name = field.name().unwrap().to_string();
        let data = field.bytes().await.unwrap();
        format!("{} : {} bytes", name, data.len())
    } else {
        "No fields found in multipary data".to_string()
    }
}

pub fn router() -> Router {
    Router::new()
        .route("/body", post(body))
        .route("/form", post(form))
        .route("/upload", post(upload))
}