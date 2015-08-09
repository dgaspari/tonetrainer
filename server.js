/**
 * Node Server Configuration
 */
'use strict';

// Module dependencies.
var express = require('express');

// Add coloring for console output
require('colors');

// Create Express server.
var app = express();

// Express configuration
require('./server/config/express')(app, express);

// Start Express server.
app.listen(app.get('port'), function() {
  console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
});

// testing zerorpc client setup:
//var zerorpc = require('zerorpc');
//var client = new zerorpc.Client();
//client.connect('tcp://127.0.0.1:4242');
//client.invoke('hello', 'world!', function(error, res, more) {
//    console.log(res)
//});

module.exports = app;
