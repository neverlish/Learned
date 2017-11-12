var agent = require('webkit-devtools-agent');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

function CPUWaster(){
  var j;
  for(var i=0; i < 10000000; i++){
    j = Math.sqrt(Math.pow(i, i));
  };
}

app.get('/', function(req, res) {
  CPUWaster();
  res.set('Important-Header', 'text-value');
  res.send('hello world<script src="/debug.js"></script>');
});

app.post('/', function(req, res) {
  res.send('<h1>POSTED</h1>');
  // in browser console
  /*
    var xhr = new XMLHttpRequest();
    var data = new FormData();
    data.append('test', 'test-value');
    xhr.open('POST','/',true);
    xhr.send(data);
  */
});

app.listen(3000);
