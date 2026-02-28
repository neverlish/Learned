// fn main() {
//     let x = 120;
//     println!("{}", x);

//     let x = "abcd";
//     println!("{}", x);

//     let mut x = true;
//     println!("{}", x);

//     x = false;
//     println!("{}", x);
// }

// fn main() {
//     let mut x = 1;
//     println!("{}", x);

//     x += 1;
//     println!("{}", x);

//     let mut a = 12;
//     a += 1;
//     a -= 5;
//     a *= 2;
//     a /= 8;
//     println!("{}", a);
// }

fn main() {
    let mut l = 0;
    let s = "가나다라";
    let s1 = "😄🧘";
    l = s.len();

    println!("{}의 len : {}", s, l);

    l = s1.len();
    println!("{}의 len : {}", s1, l);

    l = str::len(s);
}