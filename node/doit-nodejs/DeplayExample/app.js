
/**
 * router 미들웨어 추가하기
 */

var express = require('express')
, http = require('http')
, path = require('path');

var bodyParser = require('body-parser');

var socketio = require('socket.io');

var redis = require('redis');
var store = redis.createClient(6379, '127.0.0.1');
var pub = redis.createClient(6379, '127.0.0.1');
var sub = redis.createClient(6379, '127.0.0.1');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/process/setname', function(req, res) {
  console.log('/process/setname 처리함.');

  var paramId = req.param('id');
  var paramName = req.param('name');

  store.hset('user', paramId, paramName, redis.print);
  console.log('redis에 사용자를 등록햇습니다. : ' + paramId + ' -> ' + paramName);

  res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
  res.write('<h1>서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>redis에 사용자를 등록했습니다. : ' + paramId + ' -> ' + paramName + '</p></div>');
  res.write("<br><br><a href='/public/setname.html>처음으로 돌아가기</a>");
  res.end();
});

app.post('/process/getname', function(req, res) {
  console.log('/process/getname 처리함.');

  var paramId = req.param('id');

  store.hget('user', paramId, function(err, username) {
    if(err) {throw err;}

    if (username) {
      console.log('redis에서 사용자를 찾았습니다. : ' + paramId + ' -> ' + username);
      
      res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
      res.write('<h1>서버에서 응답한 결과입니다.</h1>');
      res.write('<div><p>redis에서 사용자를 찾았습니다. : ' + paramId + ' -> ' + username + '</p></div>');
      res.write("<br><br><a href='/public/getname.html'>처음으로 돌아가기</a>");
      res.end();
    } else {
      res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
      res.write('<h1>서버에서 응답한 결과입니다.</h1>');
      res.write('<div><p>redis에 사용자를 찾지 못했습니다. : ' + paramId + '</p></div>');
      res.write("<br><br><a href='/public/getname.html>처음으로 돌아가기</a>");
      res.end();
    }
  })
})

var channel_name = 'chat';

sub.on('message', function(channel, dataStr) {
  console.log('Redis subscriber received message on channel ' + channel);

  // process JSON formatted string input
  var data = JSON.parse(dataStr);
  console.log('DATA : %j', data);
});

sub.subscribe(channel_name);
console.log('redis에 subscribe 하였습니다. : ' + channel_name);

app.post('/process/publish', function(req, res) {
  console.log('/process/publish 처리함.');
  var paramSender = req.body.receiver;
  var paramReceiver = req.body.receiver;
  var paramContents = req.body.contents;

  var data = {sender: paramSender, receiver: paramReceiver, contents: paramContents};
  var dataStr = JSON.stringify(data);
  pub.publish('chat', dataStr);

  res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
  res.write('<h1>서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>redis로 publish 했습니다. 서버 로그를 확인하세요. : ' + dataStr + '</p></div>');
  res.write("<br><br><a href='/public/publish.html'>처음으로 돌아가기</a>");
  res.end();
});

app.all('*', function(req, res) {
  res.send(404, '<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>')
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

// socket.io 서버에 redis 설정
io.set('store', new socketio.RedisStore({
  redis: redis,
  redisPub: pub,
  redisSub: sub,
  redisClient: store
}));
