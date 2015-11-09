/**
 * Main Controller - controller to main webapp
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

var mainController = function(req, res) {
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
        res.json(row);
        db.close();
    });
  });
};

module.exports = {
  getsample: mainController
};
