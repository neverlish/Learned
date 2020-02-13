package mydict

import "errors"

type Dictionary map[string]string

var errNotFound = errors.New("Not Found")
var errWordExists = errors.New("That word already exists")

func (d Dictionary) Search(word string) (string, error) {
	value, exist := d[word]
	if exist {
		return value, nil
	}
	return "", errNotFound
}

func (d Dictionary) Add(word, def string) error {
	_, err := d.Search(word)
	switch err {
		case errNotFound:
			d[word] = def
		case nil:
			return errWordExists
	}
	return nil
}
