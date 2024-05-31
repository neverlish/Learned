const {RoomRegistrationRequest, RoomRegistrationResponse} = require('./groom_pb.js');
const {GroomClient} = require('./groom_grpc_web_pb.js');

var client = new GroomClient('http://localhost:5288');

var request = new RoomRegistrationRequest();
request.setRoomName('Cars');
request.setUserName('Memi');

client.registerToRoom(request, {}, (err, response) => {
  console.log(response.getJoined());
  alert("Joined: " + response.getJoined());
});