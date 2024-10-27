fn main() {
  let price: i64 = 3950;

  let count500: i64 = 10;
  let count100: i64 = 3;
  let count50: i64 = 10;

  for i500 in 0..(count500 + 1) {
    for i100 in 0..(count100 + 1) {
      for i50 in 0..(count50 + 1) {
        let total: i64 = i50 * 50 + i100 * 100 + i500 * 500;
        if price == total {
          println!("500원x{}+100원x{}+50원x{}={}", i500, i100, i50, price);
        }
      }
    }
  }
}