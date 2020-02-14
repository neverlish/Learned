// 2 - 06 Update Delete

package main

import (
	"fmt"
	"mydict"
)

func main() {
	dictionary := mydict.Dictionary{}
	baseWord := "hello"
	dictionary.Add(baseWord, "First")

	err := dictionary.Update(baseWord, "Second")
	if err != nil {
		fmt.Println(err)
	}

	dictionary.Search(baseWord)
	dictionary.Delete(baseWord)

	word, err := dictionary.Search(baseWord)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(word)
}