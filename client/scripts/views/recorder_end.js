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
    return this;
  }

});

module.exports = RecorderEndView;
