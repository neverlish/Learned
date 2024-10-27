use std::io::{stdin, Write, BufRead, BufReader};
use std::net::TcpStream;
use std::thread;
use std::time::Duration;

fn main() {
  let server_addr = "127.0.0.1:8888";
  let mut socket = TcpStream::connect(server_addr).expect("서버에 접속할 수 없습니다.");
  socket.set_nonblocking(true).expect("알 수 없는 에러");
  println!("{}에 접속했습니다.", server_addr);

  start_thread(socket.try_clone().unwrap());
  
  let user = input("이름을 입력하세요.");
  println!("{}님 메시지를 입력해주세요", user);

  loop {
    let msg = input("");
    let msg = format!("{}> {}\n", user, msg);
    let buf = msg.as_bytes();
    socket.write_all(buf).unwrap();
  }
}

fn start_thread(socket: TcpStream) {
  let mut reader = BufReader::new(socket);
  thread::spawn(move || loop {
    let mut buf = String::new();
    if let Ok(n) = reader.read_line(&mut buf) {
      if n > 0 {
        println!("[받은 메세지] {}", buf.trim());
      }
    }

    thread::sleep(Duration::from_millis(100));
  });
}

fn input(msg: &str) -> String {
  if msg != "" { println!("{}", msg); }

  let mut buf = String::new();
  stdin().read_line(&mut buf).expect("입력 에러");
  String::from(buf.trim())
}