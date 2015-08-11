/**
 * Node Server Configuration
 */
'use strict';

// Module dependencies.
var express = require('express');

// Add coloring for console output
require('colors');

// busboy drop-in for express (used to parse files)
var bb = require('express-busboy');

// Create Express server.
var app = express();

//TODO: look into security / maintenance issues with allowing uploads (need to clear out tmp dir periodically, at minimum)
//use busboy drop-in
bb.extend(app, {
    upload: true,
    path: '/home/dgaspari/dev/thesis/web/tonetrainer/scratch/tmpfiles'
});

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
