package data

import (
	"database/sql"
	"fmt"
	"time"
)

// TestNew is the function used to create an instance of the data package. It returns the type
// Model, which embeds all the types we want to be available to our application. This
// is only used when running tests.
func TestNew(dbPool *sql.DB) Models {
	db = dbPool

	return Models{
		User: &UserTest{},
		Plan: &PlanTest{},
	}
}

// UserTest is the structure which holds one user from the database,
// and is used for testing.
type UserTest struct {
	ID        int
	Email     string
	FirstName string
	LastName  string
	Password  string
	Active    int
	IsAdmin   int
	CreatedAt time.Time
	UpdatedAt time.Time
	Plan      *Plan
}

// GetAll returns a slice of all users, sorted by last name
func (u *UserTest) GetAll() ([]*User, error) {
	var users []*User

	user := User{
		ID:        1,
		Email:     "admin@example.com",
		FirstName: "Admin",
		LastName:  "Admin",
		Password:  "abc",
		Active:    1,
		IsAdmin:   1,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	users = append(users, &user)

	return users, nil
}

// GetByEmail returns one user by email
func (u *UserTest) GetByEmail(email string) (*User, error) {
	user := User{
		ID:        1,
		Email:     "admin@example.com",
		FirstName: "Admin",
		LastName:  "Admin",
		Password:  "abc",
		Active:    1,
		IsAdmin:   1,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	return &user, nil
}

// GetOne returns one user by id
func (u *UserTest) GetOne(id int) (*User, error) {
	return u.GetByEmail("")
}

// Update updates one user in the database, using the information
// stored in the receiver u
func (u *UserTest) Update() error {
	return nil
}

// Delete deletes one user from the database, by User.ID
func (u *UserTest) Delete() error {
	return nil
}

// DeleteByID deletes one user from the database, by ID
func (u *UserTest) DeleteByID(id int) error {
	return nil
}

// Insert inserts a new user into the database, and returns the ID of the newly inserted row
func (u *UserTest) Insert(user User) (int, error) {
	return 2, nil
}

// ResetPassword is the method we will use to change a user's password.
func (u *UserTest) ResetPassword(password string) error {
	return nil
}

// PasswordMatches uses Go's bcrypt package to compare a user supplied password
// with the hash we have stored for a given user in the database. If the password
// and hash match, we return true; otherwise, we return false.
func (u *UserTest) PasswordMatches(plainText string) (bool, error) {
	return true, nil
}

type PlanTest struct {
	ID                  int
	PlanName            string
	PlanAmount          int
	PlanAmountFormatted string
	CreatedAt           time.Time
	UpdatedAt           time.Time
}

func (p *PlanTest) GetAll() ([]*Plan, error) {
	var plans []*Plan

	plan := Plan{
		ID: 1,
		PlanName: "Bronze Plan",
		PlanAmount: 1000,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	plans = append(plans, &plan)

	return plans, nil
}

// GetOne returns one plan by id
func (p *PlanTest) GetOne(id int) (*Plan, error) {
	plan := Plan{
		ID: 1,
		PlanName: "Bronze Plan",
		PlanAmount: 1000,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	return &plan, nil
}

// SubscribeUserToPlan subscribes a user to one plan by insert
// values into user_plans table
func (p *PlanTest) SubscribeUserToPlan(user User, plan Plan) error {
	return nil
}

// AmountForDisplay formats the price we have in the DB as a currency string
func (p *PlanTest) AmountForDisplay() string {
	amount := float64(p.PlanAmount) / 100.0
	return fmt.Sprintf("$%.2f", amount)
}