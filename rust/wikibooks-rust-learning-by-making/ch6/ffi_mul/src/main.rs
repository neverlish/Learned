#[link(name="mycalc", kind="static")]
extern "C" {
    fn mul(a: isize, b: isize) -> isize;
}

fn main() {
    unsafe {
        let n = mul(30, 5);
        println!("{}", n);
        let n = mul(8, 80);
        println!("{}", n);
    }
}