const net = require('net');

class tcpClient {
  constructor(host, port, onCreate, onRead, onEnd, onError) {
    this.options = {
      host: host,
      port: port
    };

    this.onCreate = onCreate;
    this.onRead = onRead;
    this.onEnd = onEnd;
    this.onError = onError;
  }

  connect() {
    this.client = net.connect(this.options, () => {
      if (this.onCreate) {
        this.onCreate(this.options);
      }
    });

    this.client.on('data', (data) => {
      var sz = this.merge ? this.merge + data.toString() : data.toString();
      var arr = sz.split('¶');
      for (var n in arr) {
        if (sz.charAt(sz.length - 1) != '¶' && n == arr.length -1) {
          this.merge = arr[n];
          break;
        } else if (arr[n] == '') {
          break;
        } else {
          this.onRead(this.options, JSON.parse(arr[n]));
        }
      }
    });

    this.client.on('close', () => {
      if (this.onEnd) {
        this.onEnd(this.options);
      }
    });

    this.client.on('error', (err) => {
      if (this.onError) {
        this.onError(this.options, err);
      }
    });
  }

  write(packet) {
    this.client.write(JSON.stringify(packet) + '¶');
  }
}

module.exports = tcpClient;
