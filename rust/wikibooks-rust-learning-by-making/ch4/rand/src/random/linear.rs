use std::num::Wrapping;

pub fn rand(seed: &mut u32) -> u32 {
  let (a, c) = (134775813u32, 12345u32);
  *seed = (Wrapping(*seed) * Wrapping(a) + Wrapping(c)).0;

  *seed
}