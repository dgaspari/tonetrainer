'use strict';

var MainAppView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/main_app'],

  events: {},

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  }

});

module.exports = MainAppView;
