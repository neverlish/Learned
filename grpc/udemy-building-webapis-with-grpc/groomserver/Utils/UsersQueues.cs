using gRoom.gRPC.Messages;
using Google.Protobuf.WellKnownTypes;

namespace gRoom.gRPC.Utils;

public class UsersQueues  {
    private static List<UserQueue> _queues;
    private static Queue<ReceivedMessage> _adminQueue;

    static UsersQueues()  {
        _queues = new List<UserQueue>();
        _adminQueue = new Queue<ReceivedMessage>();
    }

    public static void CreateUserQueue(String room, String user)  {
        _queues.Add(new UserQueue(room, user));
    }    

    public static void AddMessageToRoom(ReceivedMessage msg, string room)  {
        // Add message only to users in this room 
        foreach (var queue in _queues.Where(q=>q.Room==room))  {
            queue.AddMessageToQueue(msg);
        }
        _adminQueue.Enqueue(msg);
    }

    public static ReceivedMessage GetMessageForUser(string user)  {
        var userQueue = _queues.Where(q => q.User == user).First();
        if (userQueue.GetMessagesCount()>0)  {
            return userQueue.GetNextMessage();
        }
        else  {
            return null;
        }
    }  

    public static int GetAdminQueueMessageCount()  {
        return _adminQueue.Count;
    }  

    public static ReceivedMessage GetNextAdminMessage()  {
        return _adminQueue.Dequeue();
    }
}

class UserQueue  {
    private Queue<ReceivedMessage> queue  { get; }
    public string Room { get; }
    public string User { get; }

    public UserQueue(string room, string user)  {
        Room = room;
        User = user;
        this.queue = new Queue<ReceivedMessage>();
    }

    public void AddMessageToQueue(ReceivedMessage msg)  {
        this.queue.Enqueue(msg);
    }

    public ReceivedMessage GetNextMessage()  {
        return this.queue.Dequeue();
    }  

    public int GetMessagesCount()  {
        return this.queue.Count;
    } 
}