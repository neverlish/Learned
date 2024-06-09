package main

import "time"

type BarberShop struct {
	ShopCapacity int
	HairCutDuration time.Duration
	NumberOfBarbers int
	BarbersDoneChan chan bool
	ClientsChan chan string
	Open bool
}