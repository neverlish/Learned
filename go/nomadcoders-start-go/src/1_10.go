// 1 - 10 Maps

package main

import "fmt"

func main() {
	nico := map[string]string{"name": "nico", "age": "12"}
	fmt.Println(nico)

	for key, value := range nico {
		fmt.Println(key, value)
	}
}