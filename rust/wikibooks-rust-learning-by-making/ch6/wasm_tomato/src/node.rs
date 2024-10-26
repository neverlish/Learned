#[derive(Debug, Clone)]
pub enum Node {
  Nop,
  Number(i64),
  Calc(char, Box<Node>, Box<Node>),
  If(Box<Node>, Box<Vec<Node>>, Box<Vec<Node>>),
  For(String, i64, i64, Box<Vec<Node>>),
  Print(Box<Node>),
  PrintStr(String),
  SetVar(String, Box<Node>),
  GetVar(String),
}

impl Node {
  pub fn calc(op: char, l: Node, r: Node) -> Node {
    Node::Calc(op, Box::new(l), Box::new(r))
  }

  pub fn if_(cond: Node, t: Vec<Node>, f: Vec<Node>) -> Node {
    Node::If(Box::new(cond), Box::new(t), Box::new(f))
  }
}