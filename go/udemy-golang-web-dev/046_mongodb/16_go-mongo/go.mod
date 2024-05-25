module main

go 1.22.2

replace books => ./books

replace config => ./config

require books v0.0.0-00010101000000-000000000000

require (
	config v0.0.0-00010101000000-000000000000 // indirect
	github.com/kr/text v0.2.0 // indirect
	github.com/lib/pq v1.10.9 // indirect
	github.com/rogpeppe/go-internal v1.12.0 // indirect
	gopkg.in/mgo.v2 v2.0.0-20190816093944-a6b53ec6cb22 // indirect
)
