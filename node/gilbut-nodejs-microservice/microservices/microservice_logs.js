const cluster = require('cluster');

class logs extends require('./server.js') {
  constructor() {
    super('logs', process.argv[2] ? Number(process.argv[2]) : 9040, ['POST/logs']);

    this.connectToDistributor('127.0.0.1', 9000, (data) => {
      console.log('Distributor Notification', data);
    });
  }

  onRead(socket, data) {
    const sz = new Date().toLocaleString() + '\t' + socket.remoteAddress + '\t' + socket.remotePort + '\t' + JSON.stringify(data) + '\n';
    console.log(sz);
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
