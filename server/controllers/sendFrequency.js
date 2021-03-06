/**
 * Send Frequency Controller - returns JSON for server AJAX requests on test page w audio blob
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');
var zerorpc = require('zerorpc');
var fs = require('fs');

var sendFrequencyController = function(req, res) {
  //sendfreq - make RPC call w/ blob and get freq map for input
  var freqResults = {};
  var client = new zerorpc.Client();
  client.connect('tcp://127.0.0.1:4242');
  console.log('about to send request to raptforfile');
  //req.files has reference to the audio file just uploaded - need to open it, send data via RPC, and delete it once
  //we've finished.
  client.invoke('raptforfile', req.file.path, function(error, rpcRes, more) {
    freqResults = rpcRes;
    res.json({'freqmap': freqResults});
    //at this point it should be safe to delete the file
    fs.unlinkSync(req.file.path);
  });
};

module.exports = {
  sendFrequency: sendFrequencyController
};
