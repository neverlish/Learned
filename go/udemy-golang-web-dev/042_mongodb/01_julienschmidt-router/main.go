package main

import (
	"fmt"
	"net/http"

	httprouter "github.com/julienschmidt/httprouter"
)

func main() {
	r := httprouter.New()
	r.GET("/", index)
	http.ListenAndServe("localhost:8080", r)
}

// note: using 'r' instead of 'req'
func index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Welcome!\n")
}
