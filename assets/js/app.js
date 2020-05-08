
/**
 * constraints for the media stream
 */
const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 480
  }
}

/**
 * Elements
 */
const feedViewer = document.getElementById('Feed');
const recordLink = document.getElementById('RecordImage')
const canvas = document.createElement('canvas');

canvas.width = 640;
canvas.height = 480;

const context = canvas.getContext('2d');

let streamObj;


/**
 * Captures and saves an image from the stream
 */
function recordVideo() {

  var time = Number.parseInt(window.prompt("Insert the timing (time/seconds) of the video you want to record.", "5"))
  var timeSeconds = time * 1000



  var counter = time; //Counter initial time

  var recordedChunks = [];

  var options = {
    mimeType: 'video/webm;codecs=vp9'
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {

      function handleDataAvailable(event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
          var superBuffer = new Blob(recordedChunks);
          feedViewer.src = window.URL.createObjectURL(superBuffer);
        } else {
          // ...
        }

      }

      streamObj = stream;
      mediaRecorder = new MediaRecorder(streamObj, options);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();

      // Counting
      setInterval(function () {

        counter--

        if (counter >= 0) {

          var id = document.getElementById("count");
          var txt_act = document.getElementById("txt_act")
          var txt_result = document.getElementById("txt_result")

          if (counter != 0) {
            id.innerHTML = "You are being recorded: " + counter;
            txt_act.innerHTML = "You are being recorded now, ACT!"
          } else {
            id.innerHTML = "Your video is ready"
            txt_act.innerHTML = "."
            txt_result.innerHTML = "Here is your video, DOWNLOAD it!"
          }


        }

      }, 1000);

      setTimeout(() => {
        let track = streamObj.getTracks()[0]; // if only one media track
        // ...
        track.stop();
        mediaRecorder.stop();


      }, timeSeconds)

    })
    .catch(function (err) {
      console.log('error:', err);
      let track = streamObj.getTracks()[0]; // if only one media track
      // ...
      track.stop();
    });

}