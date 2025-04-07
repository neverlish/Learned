var express = require('express')
var router = express.Router()
var axios = require('axios')
var nodemailer = require('nodemailer')

/* GET home page. */
router.post('/', function (req, res, next) {
	// var data = require('../data')
	var data = req.body
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: 'jinn.education@gmail.com',
			pass: process.env.GMAIL_PW,
		},
	})
	data.alerts.forEach((alert) => {
		const labels = alert.labels
		var qs = '?'
		Object.keys(labels).forEach((k) => {
			qs += `${k}=${labels[k]}&`
		})
		transporter.sendMail(
			{
				from: 'Alertmanager <jinn.education@gmail.com>',
				to: 'jinn.education@gmail.com',
				subject: alert.annotations.summary,
				html:
					`<div>${alert.annotations.description}</div>` +
					`<a href="http://${process.env.WEBHOOK_SERVER}:${process.env.PORT}/silence/3${qs.slice(0,-1,)}">Turn off</a>`,
			},
			(e) => {
				if (e) res.status(500).json({ result: 'fail' })
				else res.status(200).json({ result: 'success' })
			},
		)
	})
})
router.get('/silence/:hour', async (req, res, next) => {
	const hour = req.params.hour
	var labels = req.query

	var matchers = []
	Object.keys(labels).forEach((k) => {
		matchers.push({
			name: k,
			value: labels[k],
			isRegex: false,
			isEqual: true,
		})
	})
	try {
		await axios({
			method: 'POST',
			url: `http://${process.env.ALERTMANAGER_SERVER}:9093/api/v2/silences`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				matchers,
				startsAt: new Date(),
				endsAt: new Date(Date.now() + 60 * 60 * 1000 * hour),
				createdBy: 'Webhook',
				comment: 'This silence is created by Webhook',
			},
		})
		res.send(`<script>alert("Success");window.close();</script>`)
	} catch (e) {
		console.log(e)
		res.send(`<script>alert("Fail");window.close();</script>`)
	}
})

module.exports = router