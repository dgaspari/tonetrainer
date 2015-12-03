'use strict';

var MainView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/main'],

  events: {},

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
        $('#speaker_select').append($('<option></option>').attr('value', speakerData[aId].SpeakerId).text(speakerData[aId].Name));
      }
    });
  }

});

module.exports = MainView;
