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
    { character: '傷心', simplified: '伤心', filename: 'shangxin01', pinyin: 'shāngxīn' },
    { character: '傷心', simplified: '伤心', filename: 'shangxin02', pinyin: 'shāngxīn' },
    { character: '好聽', simplified: '好听', filename: 'haoting01', pinyin: 'hǎotīng' },
    { character: '好聽', simplified: '好听', filename: 'haoting02', pinyin: 'hǎotīng' },
    { character: '突然', filename: 'turan01', pinyin: 'tūrán' },
    { character: '突然', filename: 'turan02', pinyin: 'tūrán' },
    { character: '狡猾', filename: 'jiaohua01', pinyin: 'jiǎohuá' },
    { character: '狡猾', filename: 'jiaohua02', pinyin: 'jiǎohuá' },
    { character: '辛苦', filename: 'xinku01', pinyin: 'xīnkǔ' },
    { character: '辛苦', filename: 'xinku02', pinyin: 'xīnkǔ' },
    { character: '保守', filename: 'baoshou01', pinyin: 'bǎoshǒu' },
    { character: '保守', filename: 'baoshou02', pinyin: 'bǎoshǒu' },
    { character: '安靜', simplified: '安静', filename: 'anjing01', pinyin: 'ānjìng' },
    { character: '安靜', simplified: '安静', filename: 'anjing02', pinyin: 'ānjìng' },
    { character: '好看', filename: 'haokan01', pinyin: 'hǎokàn' },
    { character: '好看', filename: 'haokan02', pinyin: 'hǎokàn' },
    { character: '暖和', filename: 'nuanhuo01', pinyin: 'nuǎnhuo' },
    { character: '暖和', filename: 'nuanhuo02', pinyin: 'nuǎnhuo' },
    { character: '舒服', filename: 'shufu01', pinyin: 'shūfu' },
    { character: '舒服', filename: 'shufu02', pinyin: 'shūfu' },
    { character: '年輕', simplified: '年轻', filename: 'nianqing01', pinyin: 'niánqīng' },
    { character: '年輕', simplified: '年轻', filename: 'nianqing02', pinyin: 'niánqīng' },
    { character: '流行', filename: 'liuxing01', pinyin: 'liúxíng' },
    { character: '流行', filename: 'liuxing02', pinyin: 'liúxíng' },
    { character: '熱情', simplified: '热情', filename: 'reqing01', pinyin: 'rèqíng' },
    { character: '熱情', simplified: '热情', filename: 'reqing02', pinyin: 'rèqíng' },
    { character: '無聊', simplified: '无聊', filename: 'wuliao01', pinyin: 'wúliáo' },
    { character: '無聊', simplified: '无聊', filename: 'wuliao02', pinyin: 'wúliáo' },
    { character: '特別', simplified: '特别', filename: 'tebie01', pinyin: 'tèbié' },
    { character: '特別', simplified: '特别', filename: 'tebie02', pinyin: 'tèbié' },
    { character: '電腦', simplified: '电脑', filename: 'diannao01', pinyin: 'diànnǎo' },
    { character: '電腦', simplified: '电脑', filename: 'diannao02', pinyin: 'diànnǎo' },
    { character: '合適', simplified: '合适', filename: 'heshi01', pinyin: 'héshì' },
    { character: '合適', simplified: '合适', filename: 'heshi02', pinyin: 'héshì' },
    { character: '重要', filename: 'zhongyao01', pinyin: 'zhòngyào' },
    { character: '重要', filename: 'zhongyao02', pinyin: 'zhòngyào' },
    { character: '便宜', filename: 'pianyi01', pinyin: 'piànyí' },
    { character: '便宜', filename: 'pianyi02', pinyin: 'piànyí' },
    { character: '漂亮', filename: 'piaoliang01', pinyin: 'piàoliang' },
    { character: '漂亮', filename: 'piaoliang02', pinyin: 'piàoliang' },
    // extra words below - these are not used for the app itself:
    { character: '做飯', simplified: '做饭', filename: 'zuofan01', pinyin: 'zuòfàn' },
    { character: '做飯', simplified: '做饭', filename: 'zuofan02', pinyin: 'zuòfàn' },
    { character: '美國人', simplified: '美国人', filename: 'meiguoren01', pinyin: 'měiguórén' },
    { character: '美國人', simplified: '美国人',  filename: 'meiguoren02', pinyin: 'měiguórén' },
    { character: '小貓', simplified: '小猫', filename: 'xiaomao01', pinyin: 'xiǎomāo' },
    { character: '小貓', simplified: '小猫', filename: 'xiaomao02', pinyin: 'xiǎomāo' },
    { character: '牛肉', filename: 'niurou01', pinyin: 'niúròu' },
    { character: '牛肉', filename: 'niurou02', pinyin: 'niúròu' },
    { character: '三明治', filename: 'sanmingzhi01', pinyin: 'sānmíngzhì' },
    { character: '三明治', filename: 'sanmingzhi02', pinyin: 'sānmíngzhì' }
  ],

  initialize: function() {
    this.render();
    this.obtainMediaInfo();
    this.setDisplay();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  setDisplay: function() {
    if(window.tonetrainer_recording && window.tonetrainer_recording.pinyin) {
       $('#pinyin_display').show();
    }
    else {
      $('#pinyin_display').hide();
    }
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
    var isSimple = window.tonetrainer_recording.show_simplified;
    //change intro instructions and begin process of recording:
    $('#beginning_msg').hide();
    $('#intro_msg').html("Beginning recording process: Paused");
    var firstItem = self.charList[0];
    $('#char_display').html(self.getMandarinChar(firstItem));
    $('#pinyin_display').html(firstItem.pinyin);
    setTimeout(function() {
      self.recordSample(self.charList);
    }, 4000);
  },

  recordSample: function(currentCharList) {
    // pop top item if not empty, record, then recursively pass in list
    var self = this;
    var currentItem = currentCharList.shift();
    if(currentItem && self.isOnRecorderPage()) {
      $('#intro_msg').html('Recording');
      $('#char_display').html(self.getMandarinChar(currentItem));
      $('#char_display').addClass('recording');
      $('#pinyin_display').html(currentItem.pinyin);
      self.startRecording();
      setTimeout(function() {
        self.stopRecording(currentItem.filename);
        if(currentCharList.length == 0) {
          $('#intro_msg').html('Recording complete');
          $('#char_display').html();
          $('#pinyin_display').html();
          $('#char_display').removeClass('recording');
        }
        else {
          var nextItem = currentCharList[0];
          $('#intro_msg').html('Paused');
          $('#char_display').removeClass('recording');
          $('#char_display').html(self.getMandarinChar(nextItem));
          $('#pinyin_display').html(nextItem.pinyin);
          setTimeout(function() { self.recordSample(currentCharList); }, 4000);
        }
      }, 2000);
    }
  },

  getMandarinChar: function(jsonItem) {
    if(window.tonetrainer_recording && window.tonetrainer_recording.show_simplified && jsonItem.simplified) {
      return jsonItem.simplified;
    }
    else {
      return jsonItem.character;
    }
  }

});

module.exports = RecorderView;
