'use strict';

var MainView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/main'],

  events: {
    'click .start-training-link': 'selectSpeaker',
    'change #showpinyin': 'isShowPinyinChanged',
    'change #showsimplified': 'isShowSimplifiedChanged'
  },

  initialize: function() {
    this.render();
    this.populateControls();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  populateControls: function() {
    $.get('main/getspeakers', function(speakerData) {
      $('#speaker_select').empty();
      for (var aId in speakerData) {
        if(!window.tonetrainer_data) {
            window.tonetrainer_data = { 
	      speakerId: speakerData[aId].SpeakerId,
	      isSimplified: true,
	      isShowPinyin: true
	    };
        }
        $('#speaker_select').append($('<option></option>').attr('value', speakerData[aId].SpeakerId).text(speakerData[aId].Name));
      }
    });
  },

  selectSpeaker: function() {
    if(window.tonetrainer_data && window.tonetrainer_data.speakerId) {
      var aSpeakerIdStr = $('#speaker_select').val(); 
      window.tonetrainer_data.speakerId = parseInt(aSpeakerIdStr, 10);
    }
  },

  isShowSimplifiedChanged: function(event) {
    if(window.tonetrainer_data) {
      window.tonetrainer_data.isSimplified = $(event.target).is(':checked'); 
    }
  },

  isShowPinyinChanged: function(event) {
    if(window.tonetrainer_data) {
      window.tonetrainer_data.isShowPinyin = $(event.target).is(':checked'); 
    }
  }

});

module.exports = MainView;
