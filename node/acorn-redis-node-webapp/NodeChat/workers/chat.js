var client = require('../redis').client,
    log = require('../middleware/log');

var delta = 60 * 60 * 1000 * 3 // 10800000
var interval = 60 * 60 * 1000 * 2 // 7200000

function RemoveRooms() {
  log.debug({message: 'Removing Rooms', ts: Date.now()});
  client.zrangebyscore(
    'rooms', '-inf', ((new Date).getTime() - delta), 
    function(err, roos) {
      if (err !== null) log.error({message: 'Error in Remove Rooms', erro: er, ts: Date.now()});
      else {
        rooms.forEach(function (room) {
          client.multi()
            .zrem('rooms', room)
            .del('rooms:' + room + ':chats')
            .exec();
        });
      };
    }
  )
}

function CleanUpChatsFromRoom() {
  log.debug({message: 'Cleaning Up Chats', ts: Date.now()});
  client.zrange('rooms', 0, -1, function(err, rooms) {
    rooms.forEach(function(room) {
      client.zremrangebyscore('rooms:' + rooms + ':chats', '-inf', ((new Date).getTime() - delta));
    });
  });
}

function CleanUpUsers() {
  
}
