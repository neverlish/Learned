package main

import (
	"fmt"
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
	shop.addBarber("Gerard")
	shop.addBarber("Milton")
	shop.addBarber("Susan")
	shop.addBarber("Kelly")
	shop.addBarber("Pat")
		

	shopClosing := make(chan bool)
	closed := make(chan bool)

	go func ()  {
		<-time.After(timeOpen)
		shopClosing <- true
		shop.closeShopForDay()
		closed <- true
	}()

	i := 1

	go func ()  {
		for {
			randomMillisecond := rand.Int() % (2 * arrivalDate)
			select {
			case <-shopClosing:
				return
			case <-time.After(time.Millisecond * time.Duration(randomMillisecond)):
				shop.addClient(fmt.Sprintf("Client #%d", i))
				i++
			}
		}
	}()

	<-closed

	time.Sleep(5 * time.Second)
}