use axum::{
    routing::get,
    Router,
    extract::{
        WebSocketUpgrade,
        ws::{Message, WebSocket},
    },
    response::IntoResponse,
};

use futures_util::{sink::SinkExt, stream::StreamExt};

#[tokio::main]
async fn main() {
    let app = Router::new().route("/ws", get(websocket_handler));
    
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn websocket_handler(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(handle_socket)
}

async fn handle_socket(ws: WebSocket) {
    let (mut ws_tx, mut ws_rx) = ws.split();

    while let Some(Ok(msg)) = ws_rx.next().await {
        ws_tx
            .send(Message::Text(format!(
                "Message received: {}",
                msg.to_text().unwrap()
            )))
            .await
            .unwrap();
    }
}
