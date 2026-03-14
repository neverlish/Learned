use std::time::Duration;
use tower_http::timeout::TimeoutLayer;

mod entities;
mod utils;
mod db;
mod api;

use axum::{
    routing::get,
    Router,
};

use db::init_db;

use api::users::{
    get_users,
    post_user,
    put_user,
    delete_user,
};

use api::product::{
    get_product,
    post_product,
    put_product,
    delete_product,
};

use api::category::{
    get_category,
    post_category,
    delete_category,
};

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let conn = init_db().await;
    
    let app = Router::new()
        .route(
            "/users", 
            get(get_users)
                .post(post_user)
                .put(put_user)
                .delete(delete_user)
        )
        .route(
            "/category",
            get(get_category)
                .post(post_category)
                .delete(delete_category)
        )
        .route(
            "/product",
            get(get_product)
                .post(post_product)
                .put(put_product)
                .delete(delete_product)
        )
        .with_state(conn)
        .layer(TimeoutLayer::new(Duration::from_millis(1000)));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}
