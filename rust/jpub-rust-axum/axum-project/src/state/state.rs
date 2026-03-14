use axum::{
    Router,
    extract::{State},
    routing::get,
};
use std::sync::{Arc, Mutex};


async fn hello(State(data): State<Arc<Mutex<Vec<u8>>>>) -> String {
    let mut data = data.lock().unwrap();
    data[0] += 1;
    format!("Hello, World! {:?}", data)
}

#[tokio::main]
async fn main() {
    // let data = vec![0;3];
    let data = Arc::new(Mutex::new(vec![0;3]));
    let app = Router::new()
        .route("/", get(hello))
        .with_state(data);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
