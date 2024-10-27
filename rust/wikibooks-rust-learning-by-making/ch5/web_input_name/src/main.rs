use tide::prelude::*;

const SERVER_ADDR: &str = "127.0.0.1:8888";

#[derive(Deserialize, Serialize)]
struct UserInfo {
    name: String,
}

#[async_std::main]
async fn main() -> tide::Result<()> {
    println!("http://{}/", SERVER_ADDR);
    let mut app = tide::new();

    app.at("/").get(|_| async {
        Ok(tide::Response::builder(200)
            .content_type(tide::http::mime::HTML)
            .body(r#"
                <html><body><form action='hello'>
                name: <input name='name' value='남방큰돌고래'>
                <input type='submit' value='전송'>
                </form></body></html>"#)
            .build())
    });

    app.at("/hello").get(|req: tide::Request<()>| async move {
        let user: UserInfo = req.query()?;

        Ok(tide::Response::builder(200)
            .content_type(tide::http::mime::HTML)
            .body(format!("<h1>안녕하세요, {}님</h1>", user.name))
            .build())
    });

    app.listen(SERVER_ADDR).await?;
    Ok(())
}