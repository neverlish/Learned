using gRoom.gRPC.Messages;
using Google.Protobuf.WellKnownTypes;

namespace gRoom.gRPC.Utils;

public class MessagesQueue  {
    private static Queue<ReceivedMessage> _queue;

    static MessagesQueue()  {
        _queue = new Queue<ReceivedMessage>();
    }

    public static void AddNewsToQueue(NewsFlash news)  {
        var msg = new ReceivedMessage();
        msg.Contents = news.NewsItem;
        msg.User = "NewsBot";
        msg.MsgTime = Timestamp.FromDateTime(DateTime.UtcNow);
        _queue.Enqueue(msg);
    }

    public static ReceivedMessage GetNextMessage()  {
        return _queue.Dequeue();
    }  

    public static int GetMessagesCount()  {
        return _queue.Count;
    }  
}