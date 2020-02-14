// 2 - 05 Add Method

package main

import (
	"fmt"
	"mydict"
)

func main() {
	dictionary := mydict.Dictionary{}
	word := "hello"
	definition := "Greeting"
	err := dictionary.Add(word, definition)
	if err != nil {
		fmt.Println(err)
	}
	hello, err := dictionary.Search(word)
	fmt.Println("found", word, "definition:", hello)

	err2 := dictionary.Add(word, definition)
	if err2 != nil {
		fmt.Println(err2)
	}
}