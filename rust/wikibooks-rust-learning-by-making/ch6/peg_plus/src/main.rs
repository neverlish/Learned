peg::parser!(grammar calc() for str {
    pub rule eval() -> i64
        = term()

    rule term() -> i64
        = v1:num() "+" v2:num()
        { v1 + v2 }
    
    rule num() -> i64
        = value:$(['0'..='9']+)
        { value.parse().unwrap() }
});

fn main() {
    println!("2+5={}", calc::eval("2+5").unwrap());
    println!("8+2={}", calc::eval("8+2").unwrap());
    println!("200+50={}", calc::eval("200+50").unwrap());
}