use axum::{
    routing::{get}, 
    extract::{Path, Query},
    Router,
};

// use std::collections::HashMap;

async fn user() -> &'static str {
    "user"
}

async fn param(Path((id, name)): Path<(i32, String)>) -> String {
    format!("{} : {}", id, name)
}

// async fn query(Query(user): Query<HashMap<String, String>>) -> String {
//     format!("{} : {}", user["id"], user["name"])
// }

#[derive(serde::Deserialize)]
struct User {
    id: i32,
    name: Option<String>,
}

async fn query(Query(user): Query<User>) -> String {
    format!("{} : {}", user.id, user.name.as_ref().unwrap_or(&"No name".to_string()))
}

pub fn router() -> Router {
    Router::new()
        .route("/", get(user))
        .route("/:id/:name", get(param))
        .route("/query", get(query))
}