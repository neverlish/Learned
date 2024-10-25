use actix_web::{get, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use serde::Deserialize;

const SERVER_ADDR: &str = "127.0.0.1:8888";

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("[SERVER] http://{}/", SERVER_ADDR);

    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(calc)
    })
    .bind(SERVER_ADDR)?
    .run()
    .await
}

#[get("/")]
async fn index(_: HttpRequest) -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(r#"
            <html><body><h1>BMI 계산 및 비만도 판정</h1>
            <form action='calc'>
            <div>키: <div><label><input name='height' value='160'></label></div></div>
            <div>몸무게: <div><label><input name='weight' value='70'></label></div></div>
            <div><label><input type='submit' value='확인'></label></div>
            </form></body></html>"#
        ))
}

#[derive(Deserialize, Debug)]
pub struct FormBMI {
    height: f64,
    weight: f64,
}

#[get("/calc")]
async fn calc(q: web::Query<FormBMI>) -> Result<HttpResponse, Error> {
    println!("{:?}", q);
    let h = q.height / 100.0;
    let bmi = q.weight / (h * h);
    let per = (bmi / 22.0) * 100.0;

    Ok(HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(format!("<h3>BMI = {:.1}, 비만율 = {:.0}%</h3>", bmi, per)))
}