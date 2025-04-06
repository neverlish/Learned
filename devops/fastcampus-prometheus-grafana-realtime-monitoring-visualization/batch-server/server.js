const {Registry, Pushgateway, Gauge} = require('prom-client')
const wait = require('waait')

const register = new Registry()
const gauge = new Gauge({
  name: 'batch_process_time_second',
  help: 'Time taken for batch job to complete',
  registers: [register],
})

const batchJob = async () => {
  const random = Math.random() * 3 + 1
  await wait(random * 1000)
  if (random > 2) throw new Error('Batch Job Failed')
}

;(async () => {
  try {
    const startTime = Date.now()
    await batchJob()
    gauge.set((Date.now() - startTime) / 1000)
    console.log('Success')
  } catch (e) {
    gauge.set(-1)
    console.log('Failed')
  }
  const gateway = new Pushgateway('http://localhost:9091', [], register)
  gateway.push({
    jobName: 'batch',
    groupings: {instance: 'batch-server'},
  })
  return setTimeout(() => {
    gateway.delete({
      jobName: 'batch',
      groupings: {instance: 'batch-server'},
    })
  }, 5000)
})()