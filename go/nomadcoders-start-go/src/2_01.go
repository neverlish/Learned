// 2 - 01 Methods part One

package main

import (
	"fmt"
	"accounts"
)

func main() {
	account := accounts.NewAccount("nico")
	account.Deposit(10)
	fmt.Println(account.Balance()) // 0
}