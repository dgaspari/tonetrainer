'use strict';

var Recorder = require('../app/recorder/recorder.js')

var RecorderView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/recorder'],

  events: {},

  charList: [
    { character: '新', filename: 'xin01', pinyin: 'xīn' },
    { character: '新', filename: 'xin02', pinyin: 'xīn' },
    { character: '酸', filename: 'suan01', pinyin: 'suān' }, 
    { character: '酸', filename: 'suan02', pinyin: 'suān' }
  ],

  initialize: function() {
    this.render();
    this.obtainMediaInfo();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  startRecording: function() {
    console.log('Recording...');
    this.recorder && this.recorder.record();
  },

  stopRecording: function(filename) {
    console.log('Stopped recording');
    this.recorder && this.recorder.stop();
    this.recorder && this.recorder.exportWAV(function(blobdata) {
      //post upload HERE: 
      var uploadData = new FormData();
      //TODO: record with filename param of stop recording method - that tells what the file is
      uploadData.append('sample', blobdata, filename);
      $.ajax({
        url: 'audio/upload', //'recorder/save',
        type: 'POST',
        data: uploadData,
        contentType: false,
        processData: false,
        success: function(results) {

        }
      });
    });
    this.recorder && this.recorder.clear();
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
    self.beginRecording();
  },

  beginRecording: function() {
    var self = this;
    //change intro instructions and begin process of recording:
    $('#intro_msg').html('Now that you have allowed access to your microphone we can begin recording in 5 seconds...');
    setTimeout(function() {
      self.recordSample(self.charList);
    }, 5000);
  },

  recordSample: function(currentCharList) {
    // pop top item if not empty, record, then recursively pass in list
    var self = this;
    var currentItem = currentCharList.shift();
    if(currentItem) {
      $('#intro_msg').html('Pronounce: ' + currentItem.character);
      self.startRecording();
      setTimeout(function() {
        self.stopRecording(currentItem.filename);
        if(currentCharList.length == 0) {
          $('#intro_msg').html('...');
        }
        else {
          $('#intro_msg').html('waiting 5 seconds and then recording the next sample...');
          setTimeout(function() { self.recordSample(currentCharList); }, 5000);
        }
      }, 3000);
    }
  }

});

module.exports = RecorderView;
