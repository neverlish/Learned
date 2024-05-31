const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./Protos/groom.proto";
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

// The news item to broadcast
const newsItems=["The NASDAQ gained 1.5% yesterday", "Tomorrow's forecast: Mostly cloudy", "Olympics starts today", "We just loved Coldplay performance!", "Single winner in the lottery today"]

// Loading the protobuf contents
var grpcObj = protoLoader.loadSync(PROTO_PATH, options);
const GroomService = grpc.loadPackageDefinition(grpcObj).groom.Groom;

// Creating the service client
const clientStub = new GroomService(
   "localhost:5288",
   grpc.credentials.createInsecure()
);

// Creating the call to the service - not executing yet!
var call = clientStub.sendNewsFlash(function(error, newsStatus) {
  if (error) {
    console.error(error);
  }
  console.log('Stream success: ', newsStatus.success);
});

var itemsCount = 0;

// Calling the service in 1sec intervals
var intervalId = setInterval(function () {
  var itemIndex = Math.floor(Math.random() * 5);
  call.write({ news_item: newsItems[itemIndex] });
  itemsCount++;
  // After 10 calls - end the stream
  if (itemsCount == 10) {
    clearInterval(intervalId);
    call.end();
  }
}, 1000);