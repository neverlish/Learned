// 1 - 03 Functions part One

package main

import (
	"fmt"
	"strings"
)

func lenAndUpper(name string) (int, string) {
	return len(name), strings.ToUpper(name)
}

func repeatMe(words ...string) {
	fmt.Println(words)
}

func multiply(a, b int) int {
	return a * b
}

func main() {
	fmt.Println(multiply(2, 2))
	totalLength, upperName := lenAndUpper("nico")
	fmt.Println(totalLength, upperName)
	repeatMe("nico", "lynn", "dan", "marl", "flynn")
}