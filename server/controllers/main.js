/**
 * Main Controller - controller to main webapp
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');

var mainController = function(req, res) {
  // console.log(req.query.id);
  // for specified id, return all the data in the DB
  res.json({ 'testing': 'tested' });
};

module.exports = {
  getsample: mainController
};
