package main

import (
	"math/rand"
	"time"

	"github.com/fatih/color"
)

var seatingCapacity = 10
var arrivalDate = 100
var cutDuration = 1000 * time.Millisecond
var timeOpen = 10 * time.Second

func main() {
	rand.Seed(time.Now().UnixNano())

	color.Yellow("The Sleeping Barber Problem")
	color.Yellow("---------------------------")
	
	clientChan := make(chan string, seatingCapacity)
	doneChan := make(chan bool)

	shop := BarberShop{
		ShopCapacity: seatingCapacity,
		HairCutDuration: cutDuration,
		NumberOfBarbers: 0,
		ClientsChan: clientChan,
		BarbersDoneChan: doneChan,
		Open: true,
	}

	color.Green("The shop is open for the day!")

	shop.addBarber("Frank")

	time.Sleep(5 * time.Second)
}