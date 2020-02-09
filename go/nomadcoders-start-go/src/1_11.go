// 1 - 11 Structs

package main

import "fmt"

type person struct {
	name string
	age int
	favFood []string
}

func main() {
	favFood := []string {"kimchi", "ramen"}
	// nico := person{"nico", 18, favFood}
	nico := person{name: "nico", age: 18, favFood: favFood}
	fmt.Println(nico.name)
}