module books

go 1.22.2

replace config => ../config

require (
	config v0.0.0-00010101000000-000000000000
	gopkg.in/mgo.v2 v2.0.0-20190816093944-a6b53ec6cb22
)

require (
	github.com/kr/pretty v0.3.1 // indirect
	github.com/lib/pq v1.10.9 // indirect
)
