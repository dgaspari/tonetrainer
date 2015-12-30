/**
 * Node Server Configuration
 */
'use strict';

// file system, https setup:
var fs = require('fs');
var http = require('http');
var https = require('https');
//TODO: Just using a self-signed cert for now for https - look into better option
var privateKey  = fs.readFileSync('ssl/key.pem', 'utf8');
var certificate = fs.readFileSync('ssl/cacert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// Module dependencies.
var express = require('express');

// Add coloring for console output
require('colors');

// Create Express server.
var app = express();

// Express configuration
require('./server/config/express')(app, express);

// Start Express server (http & https).
http.createServer(app).listen(app.get('port'), function() {
  https.createServer(credentials, app).listen(9020, function() {
    console.log('✔ Express server listening on ports '.green + '%d'.blue + ' and '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), 9020, app.get('env'));
  });
});

// app.listen(app.get('port'), function() {
//  console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
//});

module.exports = app;
