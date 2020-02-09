// 2 Bank & Dictionary Projects - 00 Account + NewAccount

package main

import (
	"fmt"
	"accounts"
)

func main() {
	account := accounts.NewAccount("nico")
	// account.Owner = "pepe"
	fmt.Println(account)
}