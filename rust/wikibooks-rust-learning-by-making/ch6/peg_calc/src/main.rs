peg::parser!(grammar calc() for str {
    pub rule eval() -> i64
        = expr()

    rule expr() -> i64
        = l:term() "+" r:expr()   { l + r }
        / l:term() "-" r:expr()   { l - r }
        / term()

    rule term() -> i64
        = l:value() "*" r:term() { l * r }
        / l:value() "/" r:term() { l / r }
        / v:value()

    rule value() -> i64
        = number()
        / "(" v:expr() ")" { v }

    rule number() -> i64
        = n:$(['0'..='9']+) 
        { n.parse().unwrap() }
});

fn main() {
    println!("{}", calc::eval("1+2*3").unwrap());
    println!("{}", calc::eval("(1+2)*3").unwrap());
    println!("{}", calc::eval("100/2-1").unwrap());
}