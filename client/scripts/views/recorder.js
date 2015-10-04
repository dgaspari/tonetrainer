'use strict';

var RecorderView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/recorder'],

  events: {},

  initialize: function() {
    this.render();
    this.obtainMediaInfo();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
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

module.exports = RecorderView;
