/**
 * RecorderController - saves samples from audio recording prompt on the recorder page
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');

var recorderController = function(req, res) {
    //can we control details of where file is saved here?
};

module.exports = {
  save: recorderController
};
