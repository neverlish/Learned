package accounts

type Account struct {
	owner string
	balance int
}

func NewAccount(owner string) *Account {
	account := Account{owner: owner, balance: 0}
	return &account
}

func (a Account) Deposit(amount int) {
	a.balance += amount
}

func (a Account) Balance() int {
	return a.balance
}