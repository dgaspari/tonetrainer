'use strict';
var IndexView = require('./views/index');
var TestView = require('./views/test');
var RecorderView = require('./views/recorder');

var Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'test': 'test',
    'recorder': 'recorder'
  },
  index: function() {
    // Render index page
    new IndexView();
  },
  test: function() {
    new TestView();
  },
  recorder: function() {
    new RecorderView();
  }
});

module.exports = new Router();
