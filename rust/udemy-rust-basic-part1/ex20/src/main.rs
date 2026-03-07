// fn main() {
//     let mut data = (1000, 3.14, 'A');
//     let data2: (i32, f32, char) = data;

//     println!("{}, {}, {}", data2.0, data2.1, data2.2);
//     println!("{:?}", data2);

//     data.0 = 5;
//     data.2 = 'W';
//     println!("{:?}", data);

//     let array = [11, 22, 33];
//     let tuple = (11, 22, 33);

//     println!("{} {}", array[0], tuple.0);

//     let i = 0;
//     // println!("{} {}", array[i], tuple.i);
//     println!("{} {}", array[i], tuple.0);
// }

fn main() {
    let data = (10, 26, 'A', 15, 10, 3.14, 'W', false, -22);
    println!("{}", data.3 + data.8);

    // let data2: (i32, char, i32, f64, char, bool, i32) = data;
    // println!("{:?}", data2);

    struct 고객 {
        나이: i32,
        몸무게: f64,
        등급: char,
        비밀번호: [u8;5]
    }

    let 홍길동: 고객 = 고객 {
        나이: 21,
        몸무게: 67.3,
        등급: 'B',
        비밀번호: [6,2,1,7,4]
    };

    println!("홍길동 나이:{} 몸무게:{} 등급:{} 비밀번호 끝 두자리: {}{}", 
        홍길동.나이, 홍길동.몸무게, 홍길동.등급, 홍길동.비밀번호[3], 홍길동.비밀번호[4]);

    struct NoData{}
    let a = NoData{};
    let b = ();
}