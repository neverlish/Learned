const http = require('http');
const url = require('url');
const querystring = require('querystring');

const tcpClient = require('./client.js');

var mapClients = {};
var mapUrls = {};
var mapResponse = {};
var mapRR = {};
var index = 0;

var server = http.createServer((req, res) => {
  var method = req.method;
  var uri = url.parse(req.url, true);
  var pathname = uri.pathname;

  if (method == 'POST' || method == 'PUT') {
    var body = '';

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function() {
      var params;
      
      if (req.headers['content-type'] == 'application/json') {
        params = JSON.parse(body);
      } else {
        params = querystring.parse(body);
      }

      onRequest(res, method, pathname, params);
    });
  } else {
    onRequest(res, method, pathname, uri.query);
  }
}).listen(8000, () => {
  console.log('listen', server.address());

  var packet = {
    uri: '/distributes',
    method: 'POST',
    key: 0,
    params: {
      port: 8000,
      name: 'gate',
      urls: []
    }
  };

  var isConnectedDistributor = false;

  this.clientDistributor = new tcpClient(
    '127.0.0.1',
    9000,
    (options) => {
      isConnectedDistributor = true;
      this.clientDistributor.write(packet);
    },
    (options, data) => { onDistribute(data); },
    (options) => { isConnectedDistributor = false; },
    (options) => { isConnectedDistributor = false; }
  );

  setInterval(() => {
    if (isConnectedDistributor != true) {
      this.clientDistributor.connect();
    }
  }, 3000);
});

function onRequest(res, method, pathname, params) {
  var key = method + pathname;
  var client = mapUrls[key];
  if (client == null) {
    res.writeHead(404);
    res.end();
    return;
  } else {
    params.key = index;
    var packet = {
      uri: pathname,
      method: method,
      params: params
    };

    mapResponse[index] = res;
    index++;
    
    if (mapRR[key] == null) {
      mapRR[key] = 0;
    }
    mapRR[key]++;
    client[mapRR[key] % client.length].write(packet);
  }
}

function onDistribute(data) {
  for (var n in data.params) {
    var node = data.params[n];
    var key = node.host + ':' + node.port;
    if (mapClients[key] == null && node.name != 'gate') {
      var client = new tcpClient(node.host, node.port, onCreateClient, onReadClient, onEndClient, onErrorClient);

      mapClients[key] = {
        client: client,
        info: node
      };

      for (var m in node.urls) {
        var key = node.urls[m];
        if (mapUrls[key] == null) {
          mapUrls[key] = [];
        }
        mapUrls[key].push(client);
      }
      client.connect();
    }
  }
}

function onCreateClient(options) {
  console.log('onCreateClient');
}

function onReadClient(options, packet) {
  console.log('onReadClient', packet);
  mapResponse[packet.key].writeHead(200, { 'Content-Type': 'application/json' });
  mapResponse[packet.key].end(JSON.stringify(packet));
  delete mapResponse[packet.key];
}

function onEndClient(options) {
  var key = options.host + ':' + options.port;
  console.log('onEndClient', mapClients[key]);
  for (var n in mapClients[key].info.urls) {
    var node = mapClients[key].info.urls[n];
    delete mapUrls[node];
  }
  delete mapClients[key];
}

function onErrorClient(options) {
  console.log('onErrorClient');
}
