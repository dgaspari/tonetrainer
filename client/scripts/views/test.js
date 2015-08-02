'use strict';

var Recorder = require('../app/recorder/recorder.js')

var TestView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/test'],

  events: {},

  audio_context: null,

  volume: null,

  recorder: null,

  initialize: function() {
    this.render();
    this.setupClickHandlers();
    this.obtainMediaInfo();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

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

  handleWAV: function(blob) {
    console.log('adding link to wav file...');
    var listRef = $('#recordingList');
    // TODO: add logic to deal when currentidx is not -1 (from JSSSoundRecorder impl of handleWAV)
    var url = URL.createObjectURL(blob);
    listRef.append('<li><a href="' + url + '" download="newsound.wav">Download audio sample</a></li>');
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

});

module.exports = TestView;
