'use strict';

var MainView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/main'],

  events: {},

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  }

});

module.exports = MainView;
