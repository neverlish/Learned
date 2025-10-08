const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/helloworld'
});
stompClient.webSocketFactory = function () {
    return new SockJS("http://localhost:8080/helloworld")
  };

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);

};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#messages").html("");
}

function setSubscribed1(subscribed) {
    $("#subscribe1").prop("disabled", subscribed);
    $("#unsubscribe1").prop("disabled", !subscribed);
}

function setSubscribed2(subscribed) {
    $("#subscribe2").prop("disabled", subscribed);
    $("#unsubscribe2").prop("disabled", !subscribed);
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function subscribe1() {
    setSubscribed1(true);
    let destination = $("#subscribedDestination1").val()
    console.log('subscribe1. destination: ' + destination)
    stompClient.subscribe(destination, (response) => {
        console.log(destination + '-> here' + '. received response: ' + response.body)
        showMessage(response.body);
    });
}

function unsubscribe1() {
    setSubscribed1(false);
    console.log("unsubscribe1");
}

function subscribe2() {
    setSubscribed2(true);
    let destination = $("#subscribedDestination2").val()
    console.log('subscribe2. destination: ' + destination)
    stompClient.subscribe(destination, (response) => {
        console.log(destination + '-> here' + '. received response: ' + response.body)
        showMessage(response.body);
    });
}

function unsubscribe2() {
    setSubscribed2(false);
    console.log("unsubscribe2");
}

function sendMessage() {
    const targetDestination = $("#targetDestination").val();
    const message = $("#message").val();

    console.log("send message. targetDestination: " + targetDestination + " ,message: " + message)
    stompClient.publish({
        destination: targetDestination,
        body: JSON.stringify({'message': message})  // { "message": xxx }
    });
}

function showMessage(message) {
    $("#messages").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());

    $( "#subscribe1" ).click(() => subscribe1());
    $( "#unsubscribe1" ).click(() => unsubscribe1());
    $( "#subscribe2" ).click(() => subscribe2());
    $( "#unsubscribe2" ).click(() => unsubscribe2());


    $( "#send" ).click(() => sendMessage());
});