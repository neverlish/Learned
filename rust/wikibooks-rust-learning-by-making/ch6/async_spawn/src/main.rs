use tokio::time;

async fn say_later(sec: u64, msg: &str) {
    time::sleep(time::Duration::from_secs(sec)).await;
    println!("{}: {}", sec, msg);
}

#[tokio::main]
async fn main() {
    tokio::spawn(say_later(3, "그냥 두었다"));
    tokio::spawn(say_later(2, "콧등이 긁혀서 왔다"));
    tokio::spawn(say_later(1, "마실 나갔던 고양이가"));

    time::sleep(time::Duration::from_secs(4)).await;
    println!("------");

    tokio::join!(
        say_later(2, "내 구두코도 긁혀 있었다"),
        say_later(3, "정성껏 갈색 약을 발라 주었다"),
        say_later(1, "전날 밤 늦게 귀가한")
    );
}
