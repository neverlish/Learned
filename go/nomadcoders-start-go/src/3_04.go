// 3 - 04 Channels Recap

package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan string)
	people := [5]string{"nico", "flynn", "dal", "japanguy", "larry"}
	for _, person := range people {
		go isSexy(person, c)
	}
	for i := 0; i < len(people); i++ {
		fmt.Println(<- c)
	}
}

func isSexy(person string, c chan string) {
	time.Sleep(time.Second * 10)
	fmt.Println(person)
	c <- person + " is sexy"
}
