// 2 - 03 Finishing Up

package main

import (
	"fmt"
	"accounts"
)

func main() {
	account := accounts.NewAccount("nico")
	account.Deposit(10)
	fmt.Println(account)
}