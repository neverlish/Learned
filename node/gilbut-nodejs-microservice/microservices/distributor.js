var map = {};

class distributor extends require('./server.js') {
  constructor() {
    super('distributor', 9000, ['POST/distributes', 'GET/distributes']);
  }

  onCreate(socket) {
    console.log('onCreate', socket.remoteAddress, socket.remotePort);
    this.sendInfo(socket);
  }

  onClose(socket) {
    var key = socket.remoteAddress + ':' + socket.remotePort;
    console.log('onClose', socket.remoteAddress, socket.remotePort);
    delete map[key];
    this.sendInfo();
  }

  onRead(socket, json) {
    var key = socket.remoteAddress + ':' + socket.remotePort;
    console.log('onRead', socket.remoteAddress, socket.remotePort, json);

    if (json.uri == '/distributes' && json.method == 'POST') {
      map[key] = {
        socket: socket
      };

      map[key].info = json.params;
      map[key].info.host = socket.remoteAddress;
      this.sendInfo();
    }
  }

  write(socket, packet) {
    socket.write(JSON.stringify(packet) + '¶');
  }

  sendInfo(socket) {
    var packet = {
      uri: '/distributes',
      method: 'GET',
      key: 0,
      params: []
    };

    for (var n in map) {
      packet.params.push(map[n].info);
    }

    if (socket) {
      this.write(socket, packet);
    } else {
      for (var n in map) {
        this.write(map[n].socket, packet);
      }
    }
  }
}

new distributor();
