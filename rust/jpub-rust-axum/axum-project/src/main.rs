// mod routes;

use axum::{
    Router,
    extract::{State},
    routing::get,
};

async fn hello(State(mut data): State<Vec<u8>>) -> String {
    data[0] += 1;
    format!("Hello, World! {:?}", data)
}

#[tokio::main]
async fn main() {
    let data = vec![0;3];
    let app = Router::new()
        // .nest("/api", routes::api_router())
        .route("/", get(hello))
        .with_state(data);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
