// 1 - 07 Switch

package main

import "fmt"

func canIDrink(age int) bool {
	// switch age {
	// 	case 10:
	// 		return false
	// 	case 18:
	// 		return true
	// }
	// switch {
	// 	case age < 18:
	// 		return false
	// 	case age == 18:
	// 		return true
	// 	case age > 50:
	// 		return false
	// }
	switch koreanAge := age + 2; koreanAge {
		case 10:
			return false
		case 18:
			return true
	}
	return false
}

func main() {
	fmt.Println(canIDrink(16))
}