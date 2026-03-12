mod teams;
mod users;

use axum::Router;

pub fn api_router() -> Router {
    Router::new()
        .nest("/users", users::router())
        .nest("/teams", teams::router())
}
