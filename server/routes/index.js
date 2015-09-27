/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var testController = require('../controllers/test');
var sendFrequencyController = require('../controllers/sendFrequency');
var path = require('path');
var fs = require('fs');

var routes = function(app) {

  // Dynamically load all routes
  fs.readdirSync(__dirname).forEach(function(file) {
    // Dont load this index.js file
    if (!/index/.test(file)) {
      var route = path.join(__dirname, file);
      require(route)(app);
    }
  });

  // Home
  app.get('/', indexController.index);
  // Test
  app.get('/test', indexController.index);
  app.get('/test/getfreq', testController.test);
  app.post('/test/sendfreq', sendFrequencyController.sendFrequency);
};

module.exports = routes;
