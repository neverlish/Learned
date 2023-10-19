package main

func main() {
	cards := newDeck()

	hand, remainingCards := deal(cards, 5)

	hand.print()
	remainingCards.print()
}
