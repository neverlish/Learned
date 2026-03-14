use std::time::Duration;
use tower_http::timeout::TimeoutLayer;
use tower_http::trace::TraceLayer;
use tracing::info;
use tracing_subscriber::{fmt, prelude::*, EnvFilter};
use tower_http::compression::CompressionLayer;

mod entities;
mod utils;
mod db;
mod api;

use axum::{
    routing::{get, post},
    Router,
    middleware,
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

use api::text::text;

use api::auth::login;

use utils::jwt::authenticate;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(fmt::layer())
        .with(EnvFilter::from_default_env())
        .init();

    info!("Connecting to DB...");
    let conn = init_db().await;
    
    info!("Starting server...");
    let app = Router::new()
        .route(
            "/users", 
            get(get_users)
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
        .route(
            "/text",
            get(text)
        )
        .route_layer(middleware::from_fn(authenticate))
        .route("/auth/login", post(login))
        .route("/auth/signup", post(post_user))
        .with_state(conn)
        .layer(TimeoutLayer::new(Duration::from_millis(1000)))
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new());

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}
