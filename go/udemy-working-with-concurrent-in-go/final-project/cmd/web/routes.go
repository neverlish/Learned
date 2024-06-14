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
	mux.Post("/logout", app.Logout)
	mux.Get("/register", app.Register)
	mux.Post("/register", app.PostRegister)
	mux.Get("/activate-account", app.ActivateAccount)

	return mux
}