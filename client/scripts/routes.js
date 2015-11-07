'use strict';
var IndexView = require('./views/index');
var MainView = require('./views/main');
var MainAppView = require('./views/main_app');
var TestView = require('./views/test');
var RecorderStartView = require('./views/recorder_start');
var RecorderView = require('./views/recorder');
var RecorderEndView = require('./views/recorder_end');

var Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'main': 'main',
    'main_app' : 'main_app',
    'test': 'test',
    'recorder_start': 'recorder_start',
    'recorder': 'recorder',
    'recorder_end': 'recorder_end'
  },
  index: function() {
    // Render index page
    new IndexView();
  },
  main: function() {
    new MainView();
  },
  main_app: function() {
    new MainAppView();
  },
  test: function() {
    new TestView();
  },
  recorder_start: function() {
    new RecorderStartView();
  },
  recorder: function() {
    new RecorderView();
  },
  recorder_end: function() {
    new RecorderEndView();
  }
});

module.exports = new Router();
