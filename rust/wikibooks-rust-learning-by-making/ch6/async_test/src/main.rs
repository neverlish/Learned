#[tokio::main]
async fn main() {
    let f = say_later("포기에도 때가 있다.");
    println!("아무 때나 포기하지 마라");

    f.await;
}

async fn say_later(msg: &'static str) {
    println!("{}", msg);
}