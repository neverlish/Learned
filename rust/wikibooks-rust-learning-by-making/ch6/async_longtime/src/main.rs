use tokio::time;

#[tokio::main]
async fn main() {
    for i in 1..=3 {
        println!("#{} 시작", i);

        let s = read_longtime().await;
        println!("{}", s);
        let s: String = async {
            time::sleep(time::Duration::from_secs(1)).await;
            String::from("길게 읽어들이기 완료(block)")
        }.await;
        
        println!("{}", s);
    }
}

async fn read_longtime() -> String {
    time::sleep(time::Duration::from_secs(1)).await;
    String::from("길게 읽어들이기 완료(fn)")

}