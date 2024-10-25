mod dlist;

fn main() {
    let mut list = dlist::List::new();

    list.push(100);
    list.push(110);

    list.unshift(10);
    list.unshift(20);

    for v in list.iter() {
        println!("{}", v);
    }
}