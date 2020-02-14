// 3 - 05 One more Recap

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
	// for i := 0; i < len(people); i++ {
	// 	fmt.Print("waiting for", i)
	// 	fmt.Println(<- c)
	// }
	fmt.Println(<- c)
	fmt.Println(<- c)
	fmt.Println(<- c)
	fmt.Println(<- c)
	fmt.Println(<- c)
}

func isSexy(person string, c chan string) {
	time.Sleep(time.Second * 10)
	c <- person + " is sexy"
}
