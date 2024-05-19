package main

import (
	"context"
	"main/controllers"
	"net/http"

	httprouter "github.com/julienschmidt/httprouter"

	mgo "go.mongodb.org/mongo-driver/mongo"
	options "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	r := httprouter.New()
	// Get a UserController instance
	uc := controllers.NewUserController(getSession())
	r.GET("/user/:id", uc.GetUser)
	r.POST("/user", uc.CreateUser)
	r.DELETE("/user/:id", uc.DeleteUser)
	http.ListenAndServe("localhost:8080", r)
}

func getSession() *mgo.Client {
	// Connect to our local mongo
	s, err := mgo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost"))

	// Check if connection error, is mongo running?
	if err != nil {
		panic(err)
	}
	return s
}
