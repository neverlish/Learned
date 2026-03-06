// fn main() {

//     enum E {
//         Case1(u32),
//         Case2(char),
//         Case3(i64, bool)
//     }

//     let v = E::Case3(120, false);
//     // let v = E::Case1(120);

//     match v {
//         E::Case3(n, b) => if b {println!("12: {}", n)},
//         _ => {}
//     }

//     if let E::Case3(n, b) = v {
//         if b {println!("17: {}", n)}
//         else {println!("19: case else")}
//     } else {
//         println!("20:else");
//     }
// }

// fn main() {
//     enum E {
//         Case1(u32),
//         Case2(char),
//     }

//     let mut v = E::Case1(0);

//     while let E::Case1(n) = v {
//         println!("11: {}", n);
//         if n == 6 { break; }
//         v = E::Case1(n + 1);
//     }
// }

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let messages = [
        Message::Move { x: 3, y: 4 },
        Message::ChangeColor(255, 0, 0),
        Message::Write("Hello Rust".to_string()),
        Message::Quit,
    ];

    for m in messages {
        sub(m);
    }
}

fn sub(m: Message) {
    match m {
        Message::ChangeColor(r, g, b) => println!("change color : {}, {}, {}", r, g, b),
        Message::Move { x, y } => println!("Move to : {}, {}", x, y),
        Message::Write(text) => println!("Text message : {}", text),
        Message::Quit => println!("Quit"),
    }
}