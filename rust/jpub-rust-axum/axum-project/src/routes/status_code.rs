use axum::{
  http::{StatusCode},
  response::{Json, IntoResponse},
  routing::get,
  Router,
  extract::Path,
};
use serde_json::{json,Value};

use axum_extra::{
  TypedHeader,
  headers::{ContentType,ContentLength},
};

async fn hello() -> (StatusCode, Json<Value>) {
    (
      StatusCode::CREATED,
      Json(serde_json::json!({
        "message": "Hello, World!"
      })),
    )
}

async fn header() -> (TypedHeader<ContentType>, &'static str) {
    (
        TypedHeader(ContentType::text_utf8()),
        "Hello, World!"
    )
}

async fn response() -> (TypedHeader<ContentType>, impl IntoResponse) {
    (
        TypedHeader(ContentType::text_utf8()),
        (StatusCode::CREATED, "Hello, World!")
    )
}

async fn path(
  Path(num): Path<i32>
) -> (
  TypedHeader<ContentType>,
  TypedHeader<ContentLength>,
  (StatusCode, Json<Value>)
) {
  match num {
    0 => (
      TypedHeader(ContentType::json()),
      TypedHeader(ContentLength(27)),
      (
        StatusCode::CREATED, 
        Json(json!({"message": "Hello, World!".to_string()}))
      )
    ),
    _ => (
      TypedHeader(ContentType::json()),
      TypedHeader(ContentLength(35)),
      (
        StatusCode::INTERNAL_SERVER_ERROR, 
        Json(json!({"message": "Error during creation".to_string()}))
      )
    )
  }
}

pub fn router() -> Router {
    Router::new()
      .route("/", get(hello))
      .route("/header", get(header))
      .route("/response", get(response))
      .route("/path/:num", get(path))
}