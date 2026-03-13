use std::{
  thread,
  sync::{
    Arc,
    Mutex,
  }
};

let my_arc = Arc::new(String::from("hello"));

let cloned_arc = my_arc.clone();

let my_mutex = Mutex::new(5);

let mut data = my_mutex.lock().unwrap();
*data = 10;

let counter = Arc::new(Mutex::new(0));

let cloned = counter.clone();

let mut wrap = counter.lock().unwrap();
*wrap += 1;

fn main() {
  let counter = Arc::new(Mutex::new(0));
  let mut handles = vec![];

  for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = thread::spawn(move || {
      let mut num = counter.lock().unwrap();
      *num += 1;
    });
    handles.push(handle);
  }

  for handle in handles {
    handle.join().unwrap();
  }

  println!(
    "{}",
    Arc::into_inner(counter).unwrap().into_inner().unwrap()
  )
}