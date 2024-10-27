use scraper::Selector;
use std::{fs::File, io::Write};
use tokio::time;

#[tokio::main]
async fn main() {
    for title in ["test", "yiy"] {
        download_images(title).await;
    }
}


async fn download_images(title: &str) {
    let shodou_url = "https://uta.pw/shodou";

    let url = format!("{}/index.php?titles&show&title={}", shodou_url, title);

    println!("get: {}", url);
    let html = reqwest::get(url)
        .await.unwrap()
        .text().await.unwrap();

    let doc = scraper::Html::parse_document(&html);

    let sel = Selector::parse(".articles img").unwrap();

    for (i, node) in doc.select(&sel).enumerate() {
        let src = node.value().attr("src").unwrap();
        let img_url = format!("{}/{}", shodou_url, src);
        println!("{}", img_url);

        let filename = format!("shodou_{}_{}.png", title, i);
        let bytes = reqwest::get(img_url).await.unwrap().bytes().await.unwrap();

        let mut file = File::create(filename).unwrap();

        file.write_all(&bytes).unwrap();

        time::sleep(time::Duration::from_millis(1000)).await;
    }
}