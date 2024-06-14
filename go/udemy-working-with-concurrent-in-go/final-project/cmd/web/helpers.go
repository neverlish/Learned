package main

func (app *Config) sendMail(msg Message) {
	app.Wait.Add(1)
	app.Mailer.MailerChan <- msg
}