    // Hacks to deal with different function names in different browsers
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    window.AudioContext = (function(){
        return  window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
    })();
    // Global Variables for Audio
    var audioContext;
    var audioBuffer;
    var sourceNode;
    var analyserNode;
    var javascriptNode;
    var audioData = null;
    var audioPlaying = false;
    var sampleSize = 1024;         // number of samples to collect before analyzing FFT
    var fftSize = 1024;         // must be power of two
    var frequencyArray;         // array to hold frequency data
    // This must be hosted on the same server as this page - otherwise you get a Cross Site Scripting error
    //var audioUrl = "/assets/Doctor_Who_theme_excerpt.ogg";
    // Global Variables for Drawing
    var column = 0;
    var canvasWidth  = 800;
    var canvasHeight = 256;
    var ctx;
    // Uses the chroma.js library by Gregor Aisch to create a color gradient
    // download from https://github.com/gka/chroma.js
    var colorScale = new chroma.scale(['black', 'red', 'yellow', 'white']).out('hex');
    function setupAltSpectrogram(audioUrl) {
        // get the context from the canvas to draw on
        ctx = $("#altspectrogram-canvas").get()[0].getContext("2d");
        // the AudioContext is the primary 'container' for all your audio node objects
        try {
            audioContext = new AudioContext();
        } catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
        // When the Start button is clicked, finish setting up the audio nodes, play the sound and
        // gather samples for FFT frequency analysis, draw the spectrogram
        $("#start_button").click(function(e) {
            e.preventDefault();
            column = 0;
            // Set up / reset the audio Analyser and Source Buffer
            setupAudioNodes();
            // setup the event handler that is triggered every time enough samples have been collected
            // trigger the audio analysis and draw one column in the display based on the results
            javascriptNode.onaudioprocess = function () {
                // get the Frequency Domain data for this sample
                analyserNode.getByteFrequencyData(frequencyArray);
                // draw one column of the spectrogram if the audio is playing
                if (audioPlaying == true) {
                    requestAnimFrame(drawSpectrogram);
                }
            }
            // Load the Audio the first time through, otherwise play it from the buffer
            // Note that the audio load is asynchronous
            if(audioData == null) {
                loadSound(audioUrl);
            } else {
                playSound(audioData);
            }
        });
        // Stop the audio playing
        $("#stop_button").click(function(e) {
            e.preventDefault();
            sourceNode.stop(0);
            audioPlaying = false;
        });
    }
    function setupAudioNodes() {
        sourceNode     = audioContext.createBufferSource();
        analyserNode   = audioContext.createAnalyser();
        analyserNode.smoothingTimeConstant = 0.0;
        analyserNode.fftSize = fftSize;
        javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
        // Create the array for the data values
        frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
        // Now connect the nodes together
        sourceNode.connect(audioContext.destination);
        sourceNode.connect(analyserNode);
        analyserNode.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
    }
    // Load the sound from the URL only once and store it in global variable audioData
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        // When loaded, decode the data and play the sound
        request.onload = function () {
            audioContext.decodeAudioData(request.response, function (buffer) {
                audioData = buffer;
                playSound(audioData);
            }, onError);
        }
        request.send();
    }
    // Play the sound with no delay and loop over the sample until stopped
    function playSound(buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);    // Play the sound now
        sourceNode.loop = true;
        audioPlaying = true;
    }
    function onError(e) {
        console.log(e);
    }
    // Draw the Spectrogram from the frequency array
    // The array has 512 elements - but truncate at 256
    function drawSpectrogram() {
        for (var i = 0; i < frequencyArray.length; i++) {
            // Get the color from the color map, draw 1x1 pixel rectangle
            ctx.fillStyle = colorScale(frequencyArray[i] / 256.0);
            ctx.fillRect(column,canvasHeight - i, 1, 1);
        }
        // loop around the canvas when we reach the end
        column += 1;
        if(column >= canvasWidth) {
            column = 0;
            clearCanvas();
        }
    }
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

