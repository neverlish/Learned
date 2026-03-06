// fn main() {
//     let a = "value";

//     match a {
//         "const" => println!("상수"),
//         "value" => println!("값"),
//         _ => println!("기타"),
//     }

//     let b = 3;

//     match b {
//         1 => println!("하나"),
//         2 => println!("둘"),
//         3 => println!("셋"),
//         4 => println!("넷"),
//         _ => println!("기타"),
//     }

//     let c = '.';

//     match c {
//         'a' => println!("고객등록"),
//         '.' => println!("종료"),
//         _ => println!("기타"),
//     }
// }

// fn main() {
//     enum Result {
//         Success(u8),
//         Failure(u16, char),
//         Uncertainty,
//     }

//     let ret = Result::Failure(20, 'X');

//     match ret {
//         Result::Success(0) => println!("Success:0"),
//         Result::Success(1) => println!("Success:1"),
//         Result::Success(_) => println!("Success:other"),
//         Result::Failure(10, 'E') => println!("Error:10 - E"),
//         Result::Failure(10, _) => println!("Error:10 - other"),
//         Result::Failure(_, 'L') => println!("Error:other - LoginError"),
//         Result::Failure(_, _) => println!("Error:other - etc..."),
//         Result::Uncertainty => {},
//     }

//     // let ret2 = Result::Success(7);
//     let ret2 = Result::Failure(20, 'T');

//     match ret2 {
//         Result::Success(0) => println!("Success:0"),
//         Result::Success(1) => println!("Success:1"),
//         Result::Success(a) => println!("Success:{}", a),
//         Result::Failure(10, 'E') => println!("Error:10 - E"),
//         Result::Failure(10, c) => println!("Error:10 - {}", c),
//         Result::Failure(_, 'L') => println!("Error:other - LoginError"),
//         Result::Failure(code, retChar) => println!("Error:{} - {}..", code, retChar),
//         Result::Uncertainty => {},
//     }
// }

// fn main() {
//     enum 방위 {
//         동,
//         서,
//         남,
//         북,
//     }

//     let 진행방향 = 방위::북;

//     println!("{}", match 진행방향 {
//         방위::북 => 'N',
//         방위::남 => 'S',
//         _ => '*',
//     });
// }

fn main() {
    for n in -5..6 {
        println!("{} {}", n, match n {
            0 => "zero",
            1 => "one",
            _ if n < 0 => "음수",
            _ => "양수",
        })
    }
}