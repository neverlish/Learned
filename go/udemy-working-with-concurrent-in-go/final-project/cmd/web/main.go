package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	redisstore "github.com/alexedwards/scs/redisstore"
	scs "github.com/alexedwards/scs/v2"
	redis "github.com/gomodule/redigo/redis"

	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

const webPort = "80"

func main() {
	db := initDB()

	session := initSession()

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	wg := sync.WaitGroup{}

	app := Config {
		Session: session,
		DB: db,
		InfoLog: infoLog,
		ErrorLog: errorLog,
		Wait: &wg,
	}

	go app.listenForShutDown()

	app.serve()
}

func (app *Config) serve() {
	srv := &http.Server {
		Addr: fmt.Sprintf(":%s", webPort),
		Handler: app.routes(),
	}

	app.InfoLog.Printf("Starting web server...")

	err := srv.ListenAndServe()
	if err != nil {
		log.Panic(err)
	}
}

func initDB() *sql.DB {
	conn := connectToDB()

	if conn == nil {
		log.Panic("can't connect to database")
	}
	return conn
}

func connectToDB() *sql.DB {
	counts := 0

	dsn := os.Getenv("DSN")

	for {
		connection, err := openDB(dsn)
		if err != nil {
			log.Println("postgres not yet ready...")
		} else {
			log.Print("connected to database!")
			return connection
		}

		if counts > 10 {
			return nil
		}

		log.Print("Backing off for 1 seconds")
		time.Sleep(1 * time.Second)
		counts++
		continue
	}
}

func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("pgx", dsn)

	if err != nil {
		return nil, err
	}

	err = db.Ping();
	if err != nil {
		return nil, err
	}

	return db, nil
}

func initSession() *scs.SessionManager {
	session := scs.New()
	session.Store = redisstore.New(initRedis())
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = true
	return session
}

func initRedis() *redis.Pool {
	redisPool := &redis.Pool{
		MaxIdle: 10,
		Dial: func() (redis.Conn,error) {
			return redis.Dial("tcp", os.Getenv("REDIS"))
		},
	}

	return redisPool
}

func (app *Config) listenForShutDown() {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	app.shutdown()
	os.Exit(0)
}

func (app *Config) shutdown() {
	app.InfoLog.Println("would run cleanup tasks...")

	app.Wait.Wait()

	app.InfoLog.Println("closing channels and shutting down application...")
}