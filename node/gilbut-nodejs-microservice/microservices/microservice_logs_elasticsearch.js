const cluster = require('cluster');
const fs = require('fs');
const elasticsearch = require('elasticsearch').Client({
  host: '127.0.0.1:9200',
  log: 'trace'
});

class logs extends require('./server.js') {
  constructor() {
    super('logs', process.argv[2] ? Number(process.argv[2]) : 9040, ['POST/logs']);

    this.writestream = fs.createWriteStream('./log.txt', { flags: 'a' });

    this.connectToDistributor('127.0.0.1', 9000, (data) => {
      console.log('Distributor Notification', data);
    });
  }

  onRead(socket, data) {
    const sz = new Date().toLocaleString() + '\t' + socket.remoteAddress + '\t' + socket.remotePort + '\t' + JSON.stringify(data) + '\n';
    console.log(sz);
    this.writestream.write(sz);
    data.timestamp = new Date().toISOString();
    data.params = JSON.parse(data.params);
    elasticsearch.index({
      index: 'microservice',
      type: 'logs',
      body: data
    });
  }
}

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  new logs();
}
