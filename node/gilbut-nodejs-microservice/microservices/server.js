const net = require('net');
const tcpClient = require('./client.js');

class tcpServer {
  constructor(name, port, urls) {
    this.logTcpClient = null;
    this.context = {
      port: port,
      name: name,
      urls: urls
    };

    this.merge = {};

    this.server = net.createServer((socket) => {
      this.onCreate(socket);

      socket.on('error', (exception) => {
        this.onClose(socket);
      });

      socket.on('close', () => {
        this.onClose(socket);
      });

      socket.on('data', (data) => {
        var key = socket.remoteAddress + ':' + socket.remotePort;
        var sz = this.merge[key] ? this.merge[key] + data.toString() : data.toString();
        var arr = sz.split('¶');
        for (var n in arr) {
          if (sz.charAt(sz.length - 1) != '¶' && n == arr.length - 1) {
            this.merge[key] = arr[n];
            break;
          } else if (arr[n] == '') {
            break;
          } else {
            this.writeLog(arr[n]);
            this.onRead(socket, JSON.parse(arr[n]));
          }
        }
      });
    });

    this.server.on('error', (err) => {
      console.log(err);
    });

    this.server.listen(port, () => {
      console.log('listen', this.server.address());
    });
  }

  onCreate(socket) {
    console.log('onCreate', socket.remoteAddress, socket.remotePort);
  }

  onClose(socket) {
    console.log('onClose', socket.remoteAddress, socket.remotePort);
  }

  connectToDistributor(host, port, onNoti) {
    var packet = {
      uri: '/distributes',
      method: 'POST',
      key: 0,
      params: this.context
    };

    var isConnectedDistributor = false;

    this.clientDistributor = new tcpClient(
      host,
      port,
      (options) => {
        isConnectedDistributor = true;
        this.clientDistributor.write(packet);
      },
      (options, data) => {
        if (this.logTcpClient == null && this.context.name != 'logs') {
          for (var n in data.params) {
            const ms = data.params[n];
            if (ms.name == 'logs') {
              this.connectToLog(ms.host, ms.port);
              break;
            }
          }
        }
        onNoti(data);
      },
      (options) => { isConnectedDistributor = false; },
      (options) => { isConnectedDistributor = false; }
    );

    setInterval(() => {
      if (isConnectedDistributor != true) {
        this.clientDistributor.connect();
      }
    }, 3000);
  }

  connectToLog(host, port) {
    this.logTcpClient = new tcpClient(
      host,
      port,
      (options) => {},
      (options) => { this.logTcpClient = null; },
      (options) => { this.logTcpClient = null; }
    );

    this.logTcpClient.connect();
  }

  writeLog(log) {
    if (this.logTcpClient) {
      const packet = {
        uri: '/logs',
        method: 'POST',
        key: 0,
        params: log
      };
      this.logTcpClient.write(packet);
    } else {
      console.log(log);
    }
  }
}

module.exports = tcpServer;
