package main

import "fmt"

type englishBot struct{}
type spanishBot struct{}

func main() {
	eb := englishBot{}
	// sb := spanishBot{}

	printGreeting(eb)
	// printGreeting(sb)
}

func printGreeting(eb englishBot) {
	fmt.Println(eb.getGreeting())
}

// func printGreeting(sb spanishBot) {
// 	fmt.Println(sb.getGreeting())
// }

func (eb englishBot) getGreeting() string {
	// VERY custom logic for generating an english greeting
	return "Hi there!"
}

func (sb spanishBot) getGreeting() string {
	// VERY custom logic for generating an spanish greeting
	return "Hola!"
}
