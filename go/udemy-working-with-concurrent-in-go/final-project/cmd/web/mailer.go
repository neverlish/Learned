package main

import (
	"sync"
	"time"

	mail "github.com/xhit/go-simple-mail/v2"
)

type Mail struct {
	Domain string
	Host string
	Port int
	Username string
	Password string
	Encryption string
	FromAddress string
	FromName string
	Wait *sync.WaitGroup
	MailerChan chan Message
	ErrorChan chan error
	DoneChan chan bool
}

type Message struct {
	From string
	FromName string
	To string
	Subject string
	Attachments []string
	Data any
	DataMap map[string]any
	Template string
}

func (m *Mail) sendMail(msg Message, errorChan chan error) {
	if msg.Template == ""	{
		msg.Template = "mail"
	}

	if msg.From == "" {
		msg.From = m.FromAddress
	}

	if msg.FromName == "" {
		msg.FromName = m.FromName
	}

	data := map[string]any {
		"message": msg.Data,
	}

	msg.DataMap = data

	formattedMessage, err := m.buildHTMLMessage(msg)
	if err != nil {
		errorChan <- err
	}

	plainMessage, err := m.buildPlainTextMessage(msg)
	if err != nil {
		errorChan <- err
	}

	server := mail.NewSMTPClient()

	server.Host = m.Host
	server.Port = m.Port
	server.Username = m.Username
	server.Password = m.Password
	server.Encryption = m.getEncryption(m.Encryption)
	server.KeepAlive = false
	server.ConnectTimeout = 10 * time.Second
	server.SendTimeout = 10 * time.Second

	smptClient, err := server.Connect()
	if err != nil {
		errorChan <- err
	}

	email := mail.NewMSG()
	email.SetFrom(msg.From).AddTo(msg.To).SetSubject(msg.Subject)
	email.SetBody(mail.TextPlain, plainMessage)
	email.AddAlternative(mail.TextHTML, formattedMessage)

	if len(msg.Attachments) > 0 {
		for _, x := range msg.Attachments {
			email.AddAttachment(x)
		}
	}

	err = email.Send(smptClient)
	if err != nil {
		errorChan <- err
	}
	
	
}

func (m *Mail) buildHTMLMessage(msg Message) (string, error) {
	return "", nil
}

func (m *Mail) buildPlainTextMessage(msg Message) (string, error) {
	return "", nil
}

func (m *Mail) getEncryption(e string) mail.Encryption {
	switch e {
	case "tls":
		return mail.EncryptionSTARTTLS
	case "ssl":
		return mail.EncryptionSSLTLS
	case "none":
		return mail.EncryptionNone
	default:
		return mail.EncryptionSTARTTLS
	}
}