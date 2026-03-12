mod teams;
mod users;
mod get_routes;
mod post_routes;
mod header;
mod response;

use axum::{
    Router,
};

pub fn api_router() -> Router {
    Router::new()
        .nest("/users", users::router())
        .nest("/teams", teams::router())
        .nest("/get", get_routes::router())
        .nest("/post", post_routes::router())
        .nest("/header", header::router())
        .nest("/response", response::router())
}
