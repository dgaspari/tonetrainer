/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var mainController = require('../controllers/main'); 
var testController = require('../controllers/test');
var sendFrequencyController = require('../controllers/sendFrequency');
var recorderController = require('../controllers/recorder');
var path = require('path');
var fs = require('fs');

var multer = require('multer');

var aStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './scratch/audiofiles');
  },
  filename: function(req, file, cb) {
    var aNow = new Date();
    var aDateString = aNow.getFullYear() + "-" + (aNow.getMonth() + 1) + "-" + aNow.getDate();
    aDateString += "_" + aNow.getHours() + "-" + aNow.getMinutes() + "-" + aNow.getSeconds();
    var aFileName = 'audiosample01_' + aDateString;
    if(file && file.originalname) {
      aFileName = file.originalname + '_' + aDateString;
    }
    aFileName += '.wav';
    cb(null, aFileName);
  }
});
var upload = multer({ storage: aStorage });

var testUpload = multer({ dest: '/home/dgaspari/dev/thesis/web/tonetrainer/scratch/tmpfiles/' });

var routes = function(app) {

  // Dynamically load all routes
  fs.readdirSync(__dirname).forEach(function(file) {
    // Dont load this index.js file
    if (!/index/.test(file)) {
      var route = path.join(__dirname, file);
      require(route)(app);
    }
  });

  // Home
  app.get('/', indexController.index);
  // Main app
  app.get('/main', indexController.index);
  app.get('/main_app', indexController.index);
  app.get('/main/getsample', mainController.getsample);
  // Recorder
  app.get('/recorder', indexController.index);
  app.get('/recorder_start', indexController.index);
  app.get('/recorder_end', indexController.index);
  // app.post('/recorder/save', recorderController.save);

// Setup multer file save location:
  app.post('/audio/upload', upload.single('sample'), function(req, res, next) {
    res.status(204).end();
  });

  // Test
  app.get('/test', indexController.index);
  app.get('/test/getfreq', testController.test);
  app.post('/test/sendfreq', testUpload.single('audiodata'), function(req, res, next) {
    sendFrequencyController.sendFrequency(req, res);
  });
};

module.exports = routes;
