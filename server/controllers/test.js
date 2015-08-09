/**
 * Test Controller - returns JSON for server AJAX requests on test page
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');
var zerorpc = require('zerorpc');

var testController = function(req, res) {
  //getfreq - make RPC call to Python and get freq json for example.wav
  var freqResults = {};
  var client = new zerorpc.Client();
  client.connect('tcp://127.0.0.1:4242');
  client.invoke('raptforfile', 'example.wav', function(error, rpcRes, more) {
    freqResults = rpcRes;
    res.json({'example.wav': freqResults});
  });
};

module.exports = {
  test: testController
};
