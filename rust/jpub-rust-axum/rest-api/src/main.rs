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
        .with_state(conn);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}
