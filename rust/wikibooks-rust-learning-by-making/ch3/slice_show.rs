fn main() {
  let a = [0, 1, 2, 3, 4, 5];

  let a_slice = &a[0..3];
  println!("{:?}", a_slice);
  println!("{:?}", &a[3..5]);
  println!("{:?}", &a[4..6]);
}