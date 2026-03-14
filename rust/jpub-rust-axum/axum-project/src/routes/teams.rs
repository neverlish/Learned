use axum::{routing::post, Router};

pub fn router() -> Router {
    Router::new().route("/", post(|| async { "teams" }))
}
