const SERVER_ADDR: &str = "127.0.0.1:8888";

#[async_std::main]
async fn main() -> tide::Result<()> {
    println!("http://{}/", SERVER_ADDR);
    let mut app = tide::new();
    app.at("/").get(|_| async {
        Ok("Hello, World!")
    });

    app.listen(SERVER_ADDR).await?;
    Ok(())
}