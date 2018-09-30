const business = require('./monolithic_members.js');

class members extends require('./server.js') {
  constructor() {
    super('members', process.argv[2] ? Number(process.args[2]) : 9020, ['POST/members', 'GET/members', 'DELETE/members']);

    this.connectToDistributor('127.0.0.1', 9000, (data) => {
      console.log('Distributor Notification', data);
    });
  }

  onRead(socket, data) {
    console.log('onRead', socket.remoteAddress, socket.remotePort, data);
    business.onRequest(socket, data.method, data.uri, data.params, (s, packet) => {
      socket.write(JSON.stringify(packet) + '¶');
    });
  }
}

new members();
