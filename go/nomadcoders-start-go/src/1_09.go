// 1 - 09 Arrays and Slices

package main

import "fmt"

func main() {
	names := [5]string {"nico", "lynn", "dal"}
	names[3] = "alala"
	names[4] = "alala"
	// names[5] = "alala"
	fmt.Println(names)

	names2 := []string{"nico", "lynn", "dal"}
	// names2[3] = "lala"
	names2 = append(names2, "flynn")
	fmt.Println(names2)

}