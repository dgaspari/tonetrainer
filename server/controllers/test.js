/**
 * Test Controller - returns JSON for server AJAX requests on test page
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var zerorpc = require('zerorpc');
var fs = require('fs');

var getAllExamples = function(req, res) {
  var db = new sqlite3.Database('database/tonetrainer.db');
  db.serialize(function() {
    db.all('SELECT s.SpeakerId, s.Name, e.ExampleId, e.MandarinWord, e.PinyinWord FROM Examples e JOIN Speakers s ON s.SpeakerId = e.SpeakerId;', function(err, rows) {
      res.json(rows);
      db.close();
    });
  });
};

var getSample = function(req, res) {
  if(!req.query || !req.query.example) {
    //if no example id provided, throw an error
    console.error('Invalid request to Test Controller - expecting "example" in querystring');
    res.status(400).send('Invalid request!');
    return;
  }
  // for specified id, return all the data in the DB
  var db = new sqlite3.Database('database/tonetrainer.db');
  db.serialize(function() {
    db.get('SELECT * FROM Examples WHERE ExampleId = ?;', {1: req.query.example}, function(err, row) {
        row.WavFile = row.WavFile.toString('base64');
        res.json(row);
        db.close();
    });
  });
};

var testSendFreq = function(req, res) {
  //sendfreq - make RPC call w/ blob and get freq map for input
  var freqResults = {};
  var nccfResults = {};
  var client = new zerorpc.Client({timeout: 85, heartbeatInterval: 85000});
  client.connect('tcp://127.0.0.1:4242');
  console.log('about to send RPC call to testraptforfile');
  console.log(req.body);
  //req.files has reference to the audio file just uploaded - need to open it, send data via RPC, and delete it once
  //we've finished.
  //get params
  var aTcost = parseFloat(req.body.tcost);
  var aDcost = parseFloat(req.body.dcost);
  var aAddConst = parseFloat(req.body.addconst);
  var aVoBias = parseFloat(req.body.vobias);
  var aLagWt = parseFloat(req.body.lagwt);
  var aFreqWt = parseFloat(req.body.freqwt);
  var aNumCands = parseInt(req.body.numcands);
  var aIsTwoPass = (req.body.istwopass === 'true');
  var aIsUseFilter = (req.body.isfilter === 'true');
  //RPC call
  client.invoke('testraptforfile', req.file.path, aTcost, aDcost, aAddConst, aVoBias, aLagWt, aFreqWt, aNumCands, aIsTwoPass, aIsUseFilter,
    function(error, rpcRes, more) {
      if(error) {
        console.error(error);
      }
      freqResults = rpcRes[1];
      nccfResults = rpcRes[0];
      res.json({'freqmap': freqResults, 'nccf': nccfResults});
      //ok to delte the file at this point once we have reults to return
      fs.unlink(req.file.path);
    }
  );
};

module.exports = {
  getallexamples: getAllExamples,
  getsample: getSample,
  testsendfreq: testSendFreq
};
