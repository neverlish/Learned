const express = require('express')

const fs = require('fs')
const client = require('prom-client')

const app = express()
const logStream = fs.createWriteStream('latency.log', {flags: 'w'})

const register = new client.Registry()
const histogram = new client.Histogram({
  name: 'response_time_histogram',
  help: 'Response time for a request',
  buckets: [1, 2, 3],
  registers: [register],
})
const summary = new client.Summary({
  name: 'response_time_summary',
  help: 'Response time for a request',
  percentiles: [0.5, 0.9, 1],
  registers: [register],
})

app.use((req, res, next) => {
  req.startTime = Date.now()
  next()
})

app.get('/', async (req, res) => {
  const randomDelay = Math.random() * 3000
  await new Promise((resolve) => setTimeout(resolve, randomDelay))

  res.send('Histogram & Summary 테스트')

  const latency = Number(((Date.now() - req.startTime) / 1000).toFixed(3))

  logStream.write(`${latency.toString()}\n`)

  console.log('지연시간: ' + latency)
  histogram.observe(latency)
  summary.observe(latency)
})

app.get('/metrics', async (req, res) => {
  res.end(await register.metrics())
})

port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`${port}번 포트에서 실행중입니다...`)
})