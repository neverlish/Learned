package main

func main() {
	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100}

	for index, number := range numbers {
		if number%2 == 0 {
			println(index, "is even")
		} else {
			println(index, "is odd")
		}
	}
}
