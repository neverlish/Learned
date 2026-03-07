// fn main() {
//     let 예선합격 = false;
//     let n = 5;
//     if 예선합격 {
//        if n >= 6 {
//             println!("합격");
//         } else if n <= 3 {
//             println!("탈락.");
//         } else {
//             println!("보류");
//         }
//     } else {
//         println!("탈락, 다음 예선에 참가 하세요!");
//     }
// }

fn main() {
    let a = 5;
    // let n;

    // if a >= 10 {
    //     n = a % 3;
    // } else {
    //     n = a % 2;
    // }
    // let n = if a >= 10 { a % 3 } else { a % 2 };
    let n = if a >= 10 { a % 3 } else { a % 0.0 };

    println!("{}의 나머지는 {}", a, n);
}