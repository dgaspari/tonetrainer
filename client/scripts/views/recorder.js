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
    { character: '酸', filename: 'suan02', pinyin: 'suān' },
    { character: '忙', filename: 'mang01', pinyin: 'máng' },
    { character: '忙', filename: 'mang02', pinyin: 'máng' },
    { character: '油', filename: 'you01', pinyin: 'yóu' },
    { character: '油', filename: 'you02', pinyin: 'yóu' },
    { character: '好', filename: 'hao01', pinyin: 'hǎo' },
    { character: '好', filename: 'hao02', pinyin: 'hǎo' },
    { character: '早', filename: 'zao01', pinyin: 'zǎo' },
    { character: '早', filename: 'zao02', pinyin: 'zǎo' },
    { character: '快', filename: 'kuai01', pinyin: 'kuài' },
    { character: '快', filename: 'kuai02', pinyin: 'kuài' },
    { character: '大', filename: 'da01', pinyin: 'dà' },
    { character: '大', filename: 'da02', pinyin: 'dà' },
    { character: '傷心', filename: 'shangxin01', pinyin: 'shāngxīn' },
    { character: '傷心', filename: 'shangxin02', pinyin: 'shāngxīn' },
    { character: '好聽', filename: 'haoting01', pinyin: 'hǎotīng' },
    { character: '好聽', filename: 'haoting02', pinyin: 'hǎotīng' },
    { character: '突然', filename: 'turan01', pinyin: 'tūrán' },
    { character: '突然', filename: 'turan02', pinyin: 'tūrán' },
    { character: '狡猾', filename: 'jiaohua01', pinyin: 'jiǎohuá' },
    { character: '狡猾', filename: 'jiaohua02', pinyin: 'jiǎohuá' },
    { character: '辛苦', filename: 'xinku01', pinyin: 'xīnkǔ' },
    { character: '辛苦', filename: 'xinku02', pinyin: 'xīnkǔ' },
    { character: '保守', filename: 'baoshou01', pinyin: 'bǎoshǒu' },
    { character: '保守', filename: 'baoshou02', pinyin: 'bǎoshǒu' },
    { character: '安靜', filename: 'anjing01', pinyin: 'ānjìng' },
    { character: '安靜', filename: 'anjing02', pinyin: 'ānjìng' },
    { character: '好看', filename: 'haokan01', pinyin: 'hǎokàn' },
    { character: '好看', filename: 'haokan02', pinyin: 'hǎokàn' },
    { character: '暖和', filename: 'nuanhuo01', pinyin: 'nuǎnhuo' },
    { character: '暖和', filename: 'nuanhuo02', pinyin: 'nuǎnhuo' },
    { character: '舒服', filename: 'shufu01', pinyin: 'shūfu' },
    { character: '舒服', filename: 'shufu02', pinyin: 'shūfu' },
    { character: '年輕', filename: 'nianqing01', pinyin: 'niánqīng' },
    { character: '年輕', filename: 'nianqing02', pinyin: 'niánqīng' },
    { character: '流行', filename: 'liuxing01', pinyin: 'liúxíng' },
    { character: '流行', filename: 'liuxing02', pinyin: 'liúxíng' },
    { character: '熱情', filename: 'reqing01', pinyin: 'rèqíng' },
    { character: '熱情', filename: 'reqing02', pinyin: 'rèqíng' },
    { character: '無聊', filename: 'wuliao01', pinyin: 'wúliáo' },
    { character: '無聊', filename: 'wuliao02', pinyin: 'wúliáo' },
    { character: '特別', filename: 'tebie01', pinyin: 'tèbié' },
    { character: '特別', filename: 'tebie02', pinyin: 'tèbié' },
    { character: '電腦', filename: 'diannao01', pinyin: 'diànnǎo' },
    { character: '電腦', filename: 'diannao02', pinyin: 'diànnǎo' },
    { character: '合適', filename: 'heshi01', pinyin: 'héshì' },
    { character: '合適', filename: 'heshi02', pinyin: 'héshì' },
    { character: '重要', filename: 'zhongyao01', pinyin: 'zhòngyào' },
    { character: '重要', filename: 'zhongyao02', pinyin: 'zhòngyào' },
    { character: '便宜', filename: 'bianyi01', pinyin: 'biànyí' },
    { character: '便宜', filename: 'bianyi02', pinyin: 'biànyí' },
    { character: '漂亮', filename: 'piaoliang01', pinyin: 'piàoliang' },
    { character: '漂亮', filename: 'piaoliang02', pinyin: 'piàoliang' }
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

  isOnRecorderPage: function() {
    return $('#end_link').length;
  },

  beginRecording: function() {
    var self = this;
    //change intro instructions and begin process of recording:
    $('#intro_msg').html("Now that you've allowed access to your microphone we'll start recording in 5 seconds, starting with word below:");
    var firstItem = self.charList[0];
    $('#char_display').html(firstItem.character);
    $('#pinyin_display').html(firstItem.pinyin);
    setTimeout(function() {
      self.recordSample(self.charList);
    }, 5000);
  },

  recordSample: function(currentCharList) {
    // pop top item if not empty, record, then recursively pass in list
    var self = this;
    var currentItem = currentCharList.shift();
    if(currentItem && self.isOnRecorderPage()) {
      $('#intro_msg').html('Recording - pronounce the word below: ');
      $('#char_display').html(currentItem.character);
      $('#char_display').addClass('recording');
      $('#pinyin_display').html(currentItem.pinyin);
      self.startRecording();
      setTimeout(function() {
        self.stopRecording(currentItem.filename);
        if(currentCharList.length == 0) {
          $('#intro_msg').html('Recording complete');
          $('#char_display').html();
          $('#pinyin_display').html();
        }
        else {
          var nextItem = currentCharList[0];
          $('#intro_msg').html('Paused - waiting about 3 seconds and then recording the word below:');
          $('#char_display').removeClass('recording');
          $('#char_display').html(nextItem.character);
          $('#pinyin_display').html(nextItem.pinyin);
          setTimeout(function() { self.recordSample(currentCharList); }, 5000);
        }
      }, 3000);
    }
  }

});

module.exports = RecorderView;
