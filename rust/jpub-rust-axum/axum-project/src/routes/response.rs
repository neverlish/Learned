use axum::{
    routing::{get},
    Router,
    Json,
};
use serde_json::{json, Value};

#[derive(serde::Serialize)]
struct Message {
    message: &'static str,
}

// async fn hello() -> Json<Message> {
//     Json(Message {
//         message: "Hello, World!",
//     })
// }

async fn hello() -> Json<Value> {
    // Json(Message {
    //     message: "Hello, World!",
    // })
    Json(json!({
        "items": [
            {
                "name": "apple",
                "details": {
                    "color": "red",
                    "origin": "South Korea"
                }
            },
            {
                "name": "banana",
                "details": {
                    "color": "yellow",
                    "origin": "South America"
                }
            }
        ]
    }))
}


pub fn router() -> Router {
    Router::new()
    .route("/", get(hello))
}