use axum::{
  Router,
  routing::get,
  Extension,
};

#[derive(Clone)]
struct AppState {
    
}

async fn handler(Extension(state): Extension<AppState>) { }

#[tokio::main]
async fn main() {
  let state = AppState {};

  let app = Router::new().route("/", get(handler)).layer(Extension(state));

  let listener = tokio::net::TcpListener::bind("127.0.0.1:8000").await.unwrap();
  axum::serve(listener, app).await.unwrap();
}