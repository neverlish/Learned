package main

import "net/http"

func (app *Config) SessionLoad(next http.Handler) http.Handler {
	return app.Session.LoadAndSave(next)
}