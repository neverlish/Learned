use std::rc::Rc;
use std::cell::RefCell;

fn main() {
  let a = Rc::new(RefCell::new(1000));
  let b = Rc::clone(&a);
  *b.borrow_mut() += 100;
  println!("{}", a.borrow());
}