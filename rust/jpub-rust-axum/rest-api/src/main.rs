mod entities;

use std::collections::HashMap;

use axum::{
    extract::Query,
    routing::get,
    Json,
    Router,
};

use sea_orm::{
    ColumnTrait,
    Condition,
    Database,
    EntityTrait,
    QueryFilter,
};

use entities::users::{
    Column,
    Entity,
    Model,
};

const DATABASE_URL: &str = "postgres://axum:1234@localhost/axum";

async fn get_user(Query(params): Query<HashMap<String, String>>) -> Json<Model> {
    let conn = Database::connect(DATABASE_URL).await.unwrap();

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
    let app = Router::new().route("/users", get(get_user));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}
