package main

import (
	"database/sql"
	"log"
	"sync"

	scs "github.com/alexedwards/scs/v2"
)

type Config struct {
	Session *scs.SessionManager
	DB *sql.DB
	InfoLog *log.Logger
	ErrorLog *log.Logger
	Wait *sync.WaitGroup
}