#include<stdio.h>

int rust_mul(int a, int b);

int main() {
  printf("%d\n", rust_mul(10, 8));
  printf("%d\n", rust_mul(9, 9));
  return 0;
}

// gcc -o mycalc_test mycalc_test.c ./libmycalc.so