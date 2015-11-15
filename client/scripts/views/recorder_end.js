'use strict';

var RecorderEndView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/recorder_end'],

  events: {},

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
    
    if(window.tonetrainer_recording && window.tonetrainer_recording.show_simplified) {
      $('.thankyou').html('谢谢');
    }

    return this;
  }

});

module.exports = RecorderEndView;
