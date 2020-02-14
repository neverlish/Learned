// 2 - 02 Methods part Two

package main

import (
	"fmt"
	"accounts"
)

func main() {
	account := accounts.NewAccount("nico")
	account.Deposit(10)
	fmt.Println(account.Balance()) // 10
	err := account.Withdraw(20)
	if (err != nil) {
		fmt.Println(err)
	}
	fmt.Println(account.Balance())
}