// 1 - 08 Pointers!

package main

import "fmt"

func main() {
	// a := 2
	// b := a
	// a = 10
	// fmt.Println(a, b) // 10 2

	a := 2
	b := &a
	a = 10
	fmt.Println(a, *b) // 10 10

	*b = 202020
	fmt.Println(a, *b) // 202020 202020
}