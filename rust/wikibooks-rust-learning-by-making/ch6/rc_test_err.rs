fn main() {
  let a_box = Box::new(1000);

  {
    let b_box = a_box;
    println!("{}", b_box);
  }

  println!("{}", a_box);
}