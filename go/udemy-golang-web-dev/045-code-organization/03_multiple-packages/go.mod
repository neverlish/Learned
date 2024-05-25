module main

go 1.22.2

replace books => ./books

replace config => ./config

require books v0.0.0-00010101000000-000000000000

require (
	config v0.0.0-00010101000000-000000000000 // indirect
	github.com/lib/pq v1.10.9 // indirect
)
