using Grpc.Net.Client;
using gRoom.gRPC.Messages;

using var channel = GrpcChannel.ForAddress("http://localhost:5288");
var client = new Groom.GroomClient(channel);
Console.Write("Enter room name to register: ");
var roomName = Console.ReadLine();
var resp = client.RegisterToRoom(new RoomRegistrationRequest { RoomName = roomName });
Console.WriteLine($"Room Id: {resp.RoomId}");

Console.Read();
