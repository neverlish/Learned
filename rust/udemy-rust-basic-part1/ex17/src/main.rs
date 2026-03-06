// fn main() {
//     const 유럽: u8 = 0;
//     const 아시아: u8 = 1;
//     const 아프리카: u8 = 2;
//     const 아메리카: u8 = 3;
//     const 오세아니아: u8 = 4;

//     let 고객위치 = 아시아;
    
//     if 고객위치 == 유럽 { println!("E") }
//     else if 고객위치 == 아시아 { println!("As") }
//     else if 고객위치 == 아프리카 { println!("Af") }
//     else if 고객위치 == 아메리카 { println!("Am") }
//     else if 고객위치 == 오세아니아 { println!("O") }
// }

// fn main() {
//     enum 대륙 {
//         유럽,
//         아시아,
//         아프리카,
//         아메리카,
//         오세아니아,
//     }

//     let 고객위치 = 대륙::아시아;

//     match 고객위치 {
//         대륙::유럽 => println!("E"),
//         대륙::아시아 => println!("As"),
//         대륙::아프리카 => println!("Af"),
//         대륙::아메리카 => println!("Am"),
//         대륙::오세아니아 => println!("O"),
//     }
// }

// fn main() {
//     #[allow(dead_code)]
//     enum 대륙 {
//         유럽,
//         아시아,
//         아프리카,
//         아메리카,
//         오세아니아,
//     }

//     let 고객위치 = 대륙::아시아;

//     match 고객위치 {
//         대륙::유럽 => println!("E"),
//         대륙::아시아 => println!("As"),
//         대륙::아프리카 => println!("Af"),
//         대륙::아메리카 => println!("Am"),
//         대륙::오세아니아 => println!("O"),
//     }

//     enum T {
//         A,
//         B,
//         C,
//         D,
//     }

//     // let n: i32 = T::D;
//     // let n: u8 = T::D;
//     let n: T = T::D;

//     // let n2: T = 1;
//     let n2: T = T::B;
// }

// fn main() {
//     let a = 7.2; // 실행문장
//     12; // 표현식
//     true;
//     4 > 7;
//     5.7 + 5.0 * a;

//     // match 변수 {
//     //     경우의수1 => 표현식1,
//     //     경우의수2 => 표현식2,
//     //     경우의수3 => 표현식3,
//     // }
// }

fn main() {
    enum 방위 {
        동,
        서,
        남,
        북,
    }

    let 방향 = 방위::동;

    // if 방향 == 방위::동 {
    //     println!("귀인을 만난다");
    // } else {
    //     println!("꽝!");
    // }
    
    match 방향 {
        방위::동 => println!("귀인을 만난다."),
        방위::서 => println!("재물운이 있다."),
        // 방위::남 => {},
        // 방위::북 => {},
        _ => {},
    }
}