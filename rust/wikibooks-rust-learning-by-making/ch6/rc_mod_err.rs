use std::rc::Rc;

fn main() {
  let mut a_rc = Rc::new(1000);

  let mut b_rc = Rc::clone(&a_rc);

  *b_rc += 100;
  println!("{}", b_rc);
}