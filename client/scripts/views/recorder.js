'use strict';

var RecorderView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/recorder'],

  events: {},

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  }

});

module.exports = RecorderView;
