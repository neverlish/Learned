use axum::{
    routing::{get},
    Router,
    http::header::{
        HeaderMap,
        CONTENT_TYPE,
        USER_AGENT,
    }
};

async fn hello(headers: HeaderMap) -> String {
    let user_agent = headers
    .get(USER_AGENT)
    .map(|v| v.to_str().unwrap().to_string());

    let content_type = headers
    .get(CONTENT_TYPE)
    .map(|v| v.to_str().unwrap().to_string());
    
    format!(
        "User-Agent: {}, Content-Type: {}",
        user_agent.unwrap_or_default(),
        content_type.unwrap_or_default()
    )
}

pub fn router() -> Router {
    Router::new()
        .route("/", get(hello))
}