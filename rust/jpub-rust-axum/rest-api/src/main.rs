mod entities;
mod db;


use std::collections::HashMap;

use axum::{
    extract::{Query, State},
    routing::get,
    Json,
    Router,
};

use sea_orm::{
    ColumnTrait,
    Condition,
    DatabaseConnection,
    EntityTrait,
    QueryFilter,
};

use entities::users::{
    Column,
    Entity,
    Model,
};

use db::init_db;

async fn get_user(
    State(conn): State<DatabaseConnection>,
    Query(params): Query<HashMap<String, String>>
) -> Json<Model> {
    let mut condition = Condition::any();

    if let Some(id) = params.get("id") {
        condition = condition.add(Column::Id.eq(id.parse::<i32>().unwrap()));
    }

    if let Some(username) = params.get("username") {
        condition = condition.add(Column::Username.contains(username));
    }

    let user = Entity::find()
        .filter(condition)
        .one(&conn)
        .await
        .unwrap()
        .unwrap();

    Json(user)
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let conn = init_db().await;
    
    let app = Router::new()
        .route("/users", get(get_user))
        .with_state(conn);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}
