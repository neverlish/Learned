macro_rules! out_html {
  () => {()};
  ($e: tt) => {print!("{}", $e)};
  ($tag: ident [$($inner:tt)*] $($rest: tt)*) => {{
    print!("<{}>", stringify!($tag));
    out_html!($($inner)*);
    println!("</{}>", stringify!($tag));
    out_html!($($rest)*);
  }}
}

fn main() {
  out_html!(
    html[
      head[
        title["test"]
      ]
      body[
        h1["test"]
        p["This is test."]
      ]
    ]
  )
}