use crate::entities::{prelude::Users, users::Column};
use crate::utils::{
    app_error::AppError,
    hash::verify_password,
    jwt::create_token,
};
use axum::{
    extract::State,
    http::StatusCode,
    Json,
};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

pub async fn login(
    State(db): State<DatabaseConnection>,
    Json(request_user): Json<LoginRequest>,
) -> Result<String, AppError> {
    let user = Users::find()
        .filter(Column::Username.eq(request_user.username))
        .one(&db)
        .await
        .map_err(|error| {
            eprintln!("Error getting user by username: {:?}", error);
            AppError::new(StatusCode::INTERNAL_SERVER_ERROR, "Error logging in, please try again later")
        })?
        .ok_or_else(|| {
            AppError::new(StatusCode::BAD_REQUEST, "incorrect username and/or password")
        })?;
    
    if !verify_password(&request_user.password, &user.password)? {
        return Err(AppError::new(StatusCode::UNAUTHORIZED, "incorrect username and/or password"));
    }
    
    Ok(create_token(user.username.clone())?)
}