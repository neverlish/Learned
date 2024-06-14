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

	return mux
}