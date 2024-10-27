use actix_web::{web, App, HttpServer, HttpRequest};

const SERVER_ADDR: &str = "127.0.0.1:8888";
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("[SERVER] http://{}/", SERVER_ADDR);

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
    })
    .bind(SERVER_ADDR)?
    .run()
    .await
}

async fn index(req: HttpRequest) -> &'static str {
    println!("request: {:?}", req);
    "Hello, World!"
}