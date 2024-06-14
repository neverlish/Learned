package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *Config) routes() http.Handler {
	mux := chi.NewRouter()
	// mux := http.NewServeMux()

	mux.Use(middleware.Recoverer)
	mux.Use(app.SessionLoad)
	mux.Get("/", app.HomePage)

	mux.Get("/login", app.LoginPage)
	mux.Post("/login", app.PostLoginPage)
	mux.Get("/logout", app.Logout)
	mux.Get("/register", app.Register)
	mux.Post("/register", app.PostRegister)
	mux.Get("/activate-account", app.ActivateAccount)

	mux.Get("/test-email", func(w http.ResponseWriter, r *http.Request) {
		m := Mail{
			Domain: "localhost",
			Host: "localhost",
			Port: 1025,
			Encryption: "none",
			FromAddress: "info@mycompany.com",
			FromName: "info",
			ErrorChan: make(chan error),
		}

		msg := Message{
			To: "me@here.com",
			Subject: "Test email",
			Data: "Hello, world.",
		}

		m.sendMail(msg, make(chan error))
	})

	return mux
}