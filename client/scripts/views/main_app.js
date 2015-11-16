'use strict';

var Recorder = require('../app/recorder/recorder.js')

var tonetrainer = { exampleFreq: [] };

var MainAppView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/main_app'],

  events: {
    'click .record-audio': 'recordAudio',
    'click .load-next-word': 'loadNextWord',
    'click .load-prev-word': 'loadPrevWord'
  },

  initialize: function() {
    this.render();
    this.obtainMediaInfo();
    this.speakerChoice = 1;
    this.exampleChoice = 38;
    this.populateControls();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  populateControls: function() {
    var self = this;
    var speakerId = this.speakerChoice;
    var exampleId = this.exampleChoice;
    $.get('main/getsample?speaker=' + speakerId + '&example=' + exampleId, function(exampleData) {
      $('.mandarin-word').html(exampleData.MandarinWord);
      $('.pinyin-word').html(exampleData.PinyinWord);
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

      tonetrainer.exampleFreq = $.parseJSON(exampleData.PitchJson);
      tonetrainer.exampleFreq.unshift('example voice frequency (hz)');
      var chart = c3.generate({
        bindto: '.exampleChart',
        data: {
          columns: [
            tonetrainer.exampleFreq
          ]
        }
      });
    });
  },

  obtainMediaInfo: function() {
    var self = this;
    var startMediaFunction = function(stream) { return self.startUserMedia(self, stream); };
    //webkit shim
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
  },

  startRecording: function() {
    console.log('Recording...');
    this.recorder && this.recorder.record();
  },

  stopRecording: function() {
    console.log('Stopped recording');
    this.recorder && this.recorder.stop();
    this.recorder && this.recorder.exportWAV(this.handleWAV);
    this.recorder && this.recorder.clear();
  },

  //TODO: change testcontroller called here to something more appropriate:
  handleWAV: function(blobdata) {
    var self = this;
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
        results.freqmap.unshift('your voice frequency (hz)');
        var chart = c3.generate({
          bindto: '.exampleChart',  //'.audioChart',
          data: {
            columns: [
              tonetrainer.exampleFreq,
              results.freqmap
            ]
          }
        });
      }
    });
  },

  recordAudio: function(e) {
    e.preventDefault();
    var self = this;
    //wait 1 second, start recording, stop after 3 seconds. load data
    setTimeout(function() {
      self.startRecording();
      setTimeout(function() {
        self.stopRecording();
      }, 2000);
    }, 800);
  },

  loadNextWord: function(e) {
    e.preventDefault(); 
    this.exampleChoice += 1;
    this.populateControls();
  },

  loadPrevWord: function(e) {
    e.preventDefault(); 
    this.exampleChoice -= 1;
    this.populateControls();
  }

});

module.exports = MainAppView;
