//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia()
var rec;
//Recorder.js object
var input;
//MediaStreamAudioSourceNode we'll be recording
// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;
//new audio context to help us record
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
//add events to those 3 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);


function startRecording() {
    console.log("recordButton clicked");
    var constraints = {
        audio: true,
        video: false
    }
    /* Disable the record button until we get a success or fail from getUserMedia() */

    recordButton.disabled = true;
    stopButton.disabled = false;

    /* We're using the standard promise based getUserMedia()

    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
        /* assign to gumStream for later use */
        gumStream = stream;
        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);
        /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
        rec = new Recorder(input, {
            numChannels: 1
        })
        //start the recording process
        rec.record()
        console.log("Recording started");
    }).catch(function(err) {
        //enable the record button if getUserMedia() fails
        recordButton.disabled = false;
        stopButton.disabled = true;
    });
}

function UploadAudio(blob) {
    const formData = new FormData();
    formData.append("file", blob);

    axios.post("https://XX.XX.XX.XX:8080/upload", formData,
        {'Content-type': 'multipart/form-data',}
    ).then(response => {
    console.log(response.data);
    // Reference to the container where messages will be displayed
    var chatContainer = document.getElementById('chat');

    // Function to render messages
    function renderMessages(data) {
        // Clear previous messages
        chatContainer.innerHTML = '';

        // Loop through each message in the data array
        data.forEach(function(item) {
            // Create a new div element for each message
            var messageDiv = document.createElement('div');

            // Add a class to the div based on the role (user or assistant)
            messageDiv.className = item.role;

            // Set the text of the div to the message content
            messageDiv.textContent = item.content;

            // Append the message div to the chat container
            chatContainer.appendChild(messageDiv);
        });
    }

    // Call renderMessages with the response data
    renderMessages(response.data);
    var msg = new SpeechSynthesisUtterance();
    let lastElement = response.data.slice(-1)
    msg.text = lastElement[0].content
    console.log(lastElement[0])
    console.log(msg.text)
    window.speechSynthesis.speak(msg);
	    

    });
}



function stopRecording() {
    console.log("stopButton clicked");
    //disable the stop button, enable the record too allow for new recordings
    stopButton.disabled = true;
    recordButton.disabled = false;
    //tell the recorder to stop the recording
    rec.stop(); //stop microphone access
    gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to UploadAudio
    rec.exportWAV(UploadAudio);
}
