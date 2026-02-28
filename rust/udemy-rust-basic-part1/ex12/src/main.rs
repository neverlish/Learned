// fn main() {
//     let mut menu = vec!["짜장","짬뽕"];
//     println!("{} {} {}", menu[0], menu[1], menu.len());

//     menu.push("탕수육");
//     println!("{}", menu.len());
//     println!("{}", menu[menu.len()-1]);

//     menu.push("울면");
//     println!("{}", menu.len());

//     menu[0] = "간짜장";
//     for i in 0..menu.len() {
//         println!("{}", menu[i]);
//     }
// }

// fn main() {
//     let a = 10;
//     // let b = [0;10];
//     let x = 99;
//     let b = vec![x;a];

//     println!("{a}");
//     // println!("{a+1}");

//     for i in 0..b.len() {
//         println!("{}", b[i]); 
//     }

//     let mut c = vec![10,20,30];
//     c.push(30);

//     c = vec![100,200];
// }

fn main() {
    let mut v1 = vec![10,20,30,40];

    for i in 0..v1.len() { print!("{} ", v1[i]); } println!("");

    v1.insert(1, 500);
    for i in 0..v1.len() { print!("{} ", v1[i]); } println!("");

    v1.remove(3);
    for i in 0..v1.len() { print!("{} ", v1[i]); } println!("");

    v1.push(600);
    for i in 0..v1.len() { print!("{} ", v1[i]); } println!("");

    v1.pop();
    for i in 0..v1.len() { print!("{} ", v1[i]); } println!("");

    v1.insert(4, 999);
    for i in 0..v1.len() { print!("{} ", v1[i]); } println!("");
}