/**
 * Main Controller - controller to main webapp
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

var getSample = function(req, res) {
  if(!req.query || !req.query.speaker || !req.query.example) {
    //if no speaker and example ids provided, throw an error
    console.error('Invalid request to Main Controller - expecting "speaker" and "example" in querystring');
    res.status(400).send('Invalid request!');
    return;
  }
  // for specified id, return all the data in the DB
  var db = new sqlite3.Database('database/tonetrainer.db');
  db.serialize(function() {
    db.get('SELECT * FROM Examples WHERE SpeakerId = ? AND ExampleId = ?;', {1: req.query.speaker, 2: req.query.example}, function(err, row) {
        row.WavFile = row.WavFile.toString('base64');
        res.json(row);
        db.close();
    });
  });
};

var getSpeakers = function(req, res) {
  var db = new sqlite3.Database('database/tonetrainer.db');
  db.serialize(function() {
    db.all('SELECT * FROM Speakers;', function(err, rows) {
      res.json(rows);
      db.close();
    });
  });
};

var getSampleRange = function(req, res) {
  if(!req.query || !req.query.speaker) {
    console.error('Invalid request to Main Controller - expecting "speaker" in querystring');
    res.status(400).send('Invalid request!');
    return;
  }
  var db = new sqlite3.Database('database/tonetrainer.db');
  db.serialize(function() {
    db.all('SELECT ExampleId, MandarinWord, PinyinWord FROM Examples WHERE SpeakerId = ?;', {1: req.query.speaker}, function(err, rows) {
      res.json(rows);
      db.close();
    });
  });

}

module.exports = {
  getsample: getSample,
  getspeakers: getSpeakers,
  getsamplerange: getSampleRange
};
