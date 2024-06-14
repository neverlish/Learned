package data

import (
	"database/sql"
	"time"
)

func TestNew(dbPool *sql.DB) Models {
	db = dbPool

	return Models{}
}

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
