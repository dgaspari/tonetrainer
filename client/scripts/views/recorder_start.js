'use strict';

var RecorderStartView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/recorder_start'],

  events: {},

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  }

});

module.exports = RecorderStartView;
