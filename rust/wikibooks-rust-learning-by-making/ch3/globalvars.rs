static mut TAX: f32 = 0.1;

fn main() {
  unsafe {
    println!("Price: {}", TAX * 300.0);
    TAX = 0.08;
    println!("Price: {}", TAX * 300.0);
  }
}