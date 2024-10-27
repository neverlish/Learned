extern crate cc;

fn main() {
  cc::Build::new()
    .file("src/mycalc.c")
    .include("src")
    .compile("mycalc");
}