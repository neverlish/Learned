using Grpc.Net.Client;
using gRoom.gRPC.Messages;
using Google.Protobuf.WellKnownTypes;

using var channel = GrpcChannel.ForAddress("http://localhost:5288");
var client = new Groom.GroomClient(channel);

Console.WriteLine("Welcome the the gRoom chat!");
Console.Write("Please type your user name: ");
var username = Console.ReadLine();

Console.Write("Please type the name of the room you want to join (ie. Cars): ");
var room = Console.ReadLine();

Console.WriteLine($"Joining room {room}...");

try
{
    var joinResponse = client.RegisterToRoom(new RoomRegistrationRequest() { RoomName = room, UserName = username });
    if (joinResponse.Joined)
    {
        Console.WriteLine("Joined successfully!");
    }
    else
    {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine($"Error joining room {room}.");
        Console.ForegroundColor = ConsoleColor.Gray;
        Console.WriteLine("Press any key to close the window.");
        Console.Read();
        return;
    }
}
catch (Exception ex)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine($"Error joining room {room}. Error: {ex.Message}");
    Console.ForegroundColor = ConsoleColor.Gray;
    Console.WriteLine("Press any key to close the window.");
    Console.Read();
    return;
}

Console.WriteLine($"Press any key to enter the {room} room.");
Console.Read();
Console.Clear();

// MAKE A CALL TO THE StartChat METHOD
var call = client.StartChat();

var cts = new CancellationTokenSource();

var promptText = "Type your message: ";
var row = 2;

var task = Task.Run(async () =>
{

    while (true)
    {
        // TYPE HERE THE CODE FOR RECEIVING MESSAGES FROM THE SERVER
        if (await call.ResponseStream.MoveNext(cts.Token))
        {
            var msg = call.ResponseStream.Current;
            var left = Console.CursorLeft - promptText.Length;
            PrintMessage(msg);
        }
        await Task.Delay(500);
    }
});

Console.Write(promptText);
while (true)
{
    var input = Console.ReadLine();
    RestoreInputCursor();

    // TYPE HERE THE CODE FOR SENDING MESSAGES TO THE SERVER
    var reqMsg = new ChatMessage();
    reqMsg.Contents = input;
    reqMsg.MsgTime = Timestamp.FromDateTime(DateTime.UtcNow);
    reqMsg.Room = room;
    reqMsg.User = username;

    await call.RequestStream.WriteAsync(reqMsg);

}

// Utilities methods for positioning the cursor
void PrintMessage(ChatMessage msg)
{
    var left = Console.CursorLeft - promptText.Length;
    Console.SetCursorPosition(0, row++);
    Console.Write($"{msg.User}: {msg.Contents}");
    Console.SetCursorPosition(promptText.Length + left, 0);
}

void RestoreInputCursor()
{
    Console.SetCursorPosition(promptText.Length - 1, 0);
    Console.Write("                                    ");
    Console.SetCursorPosition(promptText.Length - 1, 0);
}