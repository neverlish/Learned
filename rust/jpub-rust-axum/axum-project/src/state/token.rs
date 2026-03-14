use axum::{
    Router,
    extract::{State},
    routing::get,
};

#[derive(Clone)]
struct AppState {
    auth_token: String,
    current_users: i32,
}

async fn token(State(state): State<AppState>) -> String {
    format!("Token: {}", state.auth_token)
}

#[tokio::main]
async fn main() {
    let state = AppState {
        auth_token: "auth_token".to_string(),
        current_users: 3,
    };
    let app = Router::new()
        .route("/token", get(token))
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
