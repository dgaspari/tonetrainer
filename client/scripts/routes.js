'use strict';
var IndexView = require('./views/index');
var TestView = require('./views/test');

var Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'test': 'test'
  },
  index: function() {
    // Render index page
    new IndexView();
  },
  test: function() {
    new TestView();
  }
});

module.exports = new Router();
