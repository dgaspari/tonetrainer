'use strict';

var RecorderStartView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/recorder_start'],

  events: {},

  initialize: function() {
    this.initState();
    this.render();
    this.setEvents();
  },

  initState: function() {
    window.tonetrainer_recording = {};
    window.tonetrainer_recording.pinyin = true;
    window.tonetrainer_recording.show_simplified = true;
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  setEvents: function() {
    $('#showpinyin').change( function() {
      window.tonetrainer_recording.pinyin = $(this).is(':checked');
    });
    $('#showsimplified').change( function() {
      window.tonetrainer_recording.show_simplified = $(this).is(':checked'); 
    });
  }

});

module.exports = RecorderStartView;
