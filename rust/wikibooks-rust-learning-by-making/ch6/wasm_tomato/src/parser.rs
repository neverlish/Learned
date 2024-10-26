use peg;
use crate::node::Node;

peg::parser!(pub grammar tomato() for str {
  pub rule parse() -> Vec<Node>
    = v:sentences()

  rule sentences() -> Vec<Node>
    = sentence() ** end_of_line()

  rule sentence() -> Node
    = print() / if() / for() / let() / _ { Node::Nop }

  rule print() -> Node
    = "print" _ "\"" v:$([^ '"']*) "\""
    { Node::PrintStr(v.to_string()) }
    / "print" _ v:calc()
    { Node::Print(Box::new(v)) }

  rule if() -> Node = "if" _ v:if_cond() { v}
  
  rule if_cond() -> Node
    = if_elif() / if_else() / if_true_only()

  rule if_elif() -> Node
    = cond:calc() t:block() lf() "elif" _ f:if_cond()
    { Node::if_(cond, t, vec![f]) }

  rule if_else() -> Node
    = cond:calc() t:block() lf() "else" _ f:block()
    { Node::if_(cond, t, f) }

  rule if_true_only() -> Node
    = cond:calc() t:block()
    { Node::if_(cond, t, vec![]) }

  rule block() -> Vec<Node>
    = "{" _ v:sentences() _ "}" _ { v }

  rule for() -> Node
    = "for" _ w:word() _ "=" _ start:number() _
      "to" _ end:number() _ body:block()
    { Node::For(w, start, end, Box::new(body)) }

  rule let() -> Node
    = w:word() _ "=" _ v:calc()
    { Node::SetVar(w, Box::new(v)) }

  rule calc() -> Node = comp()

  rule comp() -> Node
    = l:expr() "==" _ r:comp() { Node::calc('=', l, r) }
    / l:expr() "!=" _ r:comp() { Node::calc('!', l, r) }
    / l:expr() ">" _ r:comp() { Node::calc('>', l, r) }
    / l:expr() ">=" _ r:comp() { Node::calc('g', l, r) }
    / l:expr() "<" _ r:comp() { Node::calc('<', l, r) }
    / l:expr() "<=" _ r:comp() { Node::calc('l', l, r) }
    / expr()

  rule expr() -> Node
    = l:term() "+" _ r:calc() { Node::calc('+', l, r) }
    / l:term() "-" _ r:calc() { Node::calc('-', l, r) }
    / term()

  rule term() -> Node
    = l:val() "*" _ r:term() { Node::calc('*', l, r) }
    / l:val() "/" _ r:term() { Node::calc('/', l, r) }
    / l:val() "%" _ r:term() { Node::calc('%', l, r) }
    / val()

  rule val() -> Node
    = "(" _ v:calc() _ ")" { v }
    / v:number() _ { Node::Number(v) }
    / v:word() _ { Node::GetVar(v) }

  rule number() -> i64
    = n:$(['0'..='9']+) { n.parse().unwrap() }

  rule word() -> String
    = v:$(['a'..='z'|'A'..='Z'|'_']+ ['0'..='9']*)
    { String::from(v) }
  
  rule end_of_line() = [';' | '\n']+ _

  rule lf() = _ ['\n']* _

  rule _ = [' ' | '\t']*
});