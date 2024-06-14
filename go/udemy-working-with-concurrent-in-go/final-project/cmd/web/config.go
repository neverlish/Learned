package main

import (
	"database/sql"
	"final-project/data"
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
	Models data.Models
	Mailer Mail
}