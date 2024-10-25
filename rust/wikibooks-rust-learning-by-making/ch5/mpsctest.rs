use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn sleep_sender(name: &str, sender: mpsc::Sender<String>) {
  let whales = ["큰고래", "흑동고래", "향유고래", "남방큰돌고래", "북극고래"];
  for whale in whales {
    let msg = format!("{}: {}", name, whale);
    sender.send(msg).unwrap();
    thread::sleep(Duration::from_millis(1000));
  }
  sender.send("quit".to_string()).unwrap();
}

fn main() {
  let (tx, rx) = mpsc::channel::<String>();

  let sender = tx.clone();

  thread::spawn(|| {
    sleep_sender("우영우", sender);
  });

  let sender = tx.clone();
  thread::spawn(|| {
    sleep_sender("이준호", sender);
  });

  loop {
    let buf = rx.recv().unwrap();
    println!("[수신] {}", buf);
    if buf == "quit" { break; }
  }
}