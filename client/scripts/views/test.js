'use strict';

var Recorder = require('../app/recorder/recorder.js')

var TestView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/test'],

  events: {
    'click .link-out': 'navigateAway',
    'change #example_select': 'selectExample',
    'click .recalc-freq': 'selectExample'
  },

  audio_context: null,

  volume: null,

  recorder: null,

  initialize: function() {
    this.render();
    this.populateControls();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  populateControls: function() {
    var self = this;
    var aSelect = $('#example_select');
    $.get('test/getallexamples', function(exampleData) {
      aSelect.empty();
      for (var aId in exampleData) {
        var aText = '(' + exampleData[aId].ExampleId  + ') - ' + exampleData[aId].Name + ' - '  + exampleData[aId].MandarinWord;
        aText += ' - ' + exampleData[aId].PinyinWord;
        aSelect.append($('<option></option>').attr('value', exampleData[aId].ExampleId).text(aText));
      }
      self.selectExample();
    });
  },

  selectExample: function() {
    var self = this;
    var exampleId = $('#example_select').val();
    $('.exampleChart').hide();
    $.get('test/getsample?example=' + exampleId, function(exampleData) {
      window.exampleFreq = $.parseJSON(exampleData.PitchJson);
      window.exampleFreq.unshift('example voice frequency (hz)');
      var snd = new Audio("data:audio/wav;base64," + exampleData.WavFile);
      snd.play();
      var aBinary = atob(exampleData.WavFile);
      var aLen = aBinary.length;
      var aBuffer = new ArrayBuffer(aLen);
      var aView = new Uint8Array(aBuffer);
      for(var i=0; i<aLen; i++) {
        aView[i] = aBinary.charCodeAt(i);
      }
      var aBlob = new Blob( [aView], { type: "audio/wav" });
      var wavFileBlobUrl = URL.createObjectURL(aBlob);
      $('.example-audio-player').attr('src',wavFileBlobUrl);

      self.handleWAV(aBlob);
    });
  },

  handleWAV: function(blobdata) {
    var self = this;
    console.log('passing blob to python module...');
    var uploadData = new FormData();
    uploadData.append('audiodata', blobdata);
    uploadData.append('tcost', $('#rapt_tcost').val());
    uploadData.append('dcost', $('#rapt_dcost').val());
    $.ajax({
      url: 'test/testsendfreq',
      type: 'POST',
      data: uploadData,
      contentType: false,
      processData: false,
      success: function(results) {
        console.log('rpc call returned:');
        results.freqmap.unshift('new test voice frequency (hz)');
        var chart = c3.generate({
          bindto: '.exampleChart',  //'.audioChart',
          data: {
            columns: [
              window.exampleFreq,
              results.freqmap
            ]
          }
        });
        $('.exampleChart').show();
      }
    });
  },
  
  navigateAway: function(e) {
    this.unbind();
    this.undelegateEvents();
  }

/*
  setupClickHandlers: function() {
    var self = this;
    $('#recordAudio').click(function() {
      self.recorder && self.recorder.record();
      console.log('Recording...');
    });
    $('#stopRecordingAudio').click(function() {
      self.recorder && self.recorder.stop();
      console.log('Stopped recording');
      self.addDownloadLink();
      self.recorder && self.recorder.clear();
    });
  },

  addDownloadLink: function() {
    this.recorder && this.recorder.exportWAV(this.handleWAV);
  },

  handleWAV: function(blobdata) {
    console.log('passing blob to python module...');
    var uploadData = new FormData();
    uploadData.append('audiodata', blobdata);
    $.ajax({
      url: 'test/sendfreq',
      type: 'POST',
      data: uploadData,
      contentType: false,
      processData: false,
      success: function(results) {
        console.log('rpc call returned:');
        results.freqmap.unshift('voice frequency (hz)');
        console.log(results.freqmap);
        var chart = c3.generate({
          bindto: '#chart',
          data: {
            columns: [
              results.freqmap
            ]
          }
        });
      }
    });
    console.log('adding link to wav file...');
    var listRef = $('#recordingList');
    // TODO: add logic to deal when currentidx is not -1 (from JSSSoundRecorder impl of handleWAV)
    var url = URL.createObjectURL(blobdata);
    var fileTimeStamp = new Date().toISOString() + '.wav';
    listRef.append('<li><a class="audio-download-link" data-bypass=""  href="' + url + '" download="' + fileTimeStamp + '">Download audio sample</a></li>');
    var sample = new Spectrogram(url, "#vis", {width:500, height:200, maxFrequency:8000});
    setupAltSpectrogram(url);
  },

  obtainMediaInfo: function() {
    var self = this;
    var startMediaFunction = function(stream) { return self.startUserMedia(self, stream); };
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL;
    navigator.getUserMedia({audio: true}, startMediaFunction, function(e) {
      console.warn('No live audio input: ' + e);
    });
  },

  startUserMedia: function(self, stream) {

    self.audio_context = new AudioContext();
    var input = self.audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');
    self.volume = self.audio_context.createGain();
    self.volume.gain.value = 0;
    input.connect(self.volume)
    self.volume.connect(self.audio_context.destination);
    console.log('Input connected to audio context destination.');
    self.recorder = new Recorder(input);
    console.log('Recorder initialised.');
  }
*/
});

module.exports = TestView;
