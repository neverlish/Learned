use std::net::{TcpListener, TcpStream};
use std::io::{BufReader, BufRead, Write};
use std::thread;
use std::sync::mpsc;
use std::time::Duration;

fn main() {
  let server_addr = "127.0.0.1:8888";
  let (tx, rx) = mpsc::channel::<String>();
  let mut clients: Vec<TcpStream> = Vec::new();

  let server = TcpListener::bind(server_addr).expect("서버 실행 실패");
  server.set_nonblocking(true).expect("알 수 없는 에러");
  println!("{}에서 서버가 실행 중입니다.", server_addr);

  loop {
    if let Ok((client, addr)) = server.accept() {
      println!("클라이언트 접속: {}", addr);
      clients.push(client.try_clone().unwrap());
      start_thread(client, tx.clone());
    }

    if let Ok(msg) = rx.try_recv() {
      println!("전원에게 보내기 : {}", msg.trim());
      clients = send_all(clients, &msg);
    }

    thread::sleep(Duration::from_millis(100));
  }
}

fn start_thread(client: TcpStream, tx: mpsc::Sender<String>) {
  let mut reader = BufReader::new(client);
  thread::spawn(move || loop {
    let mut msg = String::new();
    if let Ok(n) = reader.read_line(&mut msg) {
      if n > 0 {
        tx.send(msg).unwrap();
      }
    }

    thread::sleep(Duration::from_millis(100));
  });
}

fn send_all(clients: Vec<TcpStream>, s: &str) -> Vec<TcpStream> {
  let mut collector = vec![];
  for mut socket in clients.into_iter() {
    let bytes = String::from(s).into_bytes();
    if let Err(e) = socket.write_all(&bytes) {
      println!("전송 에러 : {}", e);
      continue;
    }

    collector.push(socket);
  }
  collector
}