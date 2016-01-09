/**
 * Test Controller - returns JSON for server AJAX requests on test page
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

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

module.exports = {
  getallexamples: getAllExamples,
  getsample: getSample
};
