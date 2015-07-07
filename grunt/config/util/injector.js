// Configuration for Injector task(s)
// Injects Link/Import statements in to specified files
'use strict';

var _str = require('underscore.string');

var taskConfig = function(grunt) {

  grunt.config.set('injector', {
    options: {

    },
    // Inject component scss into main.scss
    sass: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/styles/', '');
          filePath = filePath.replace(/(\/)(_)([a-zA-z]+\.[A-Za-z]*)/, '$1$3');
          
          return '@import \'' + filePath.slice(0, -5) + '\';';
        },
        starttag: '// [injector]',
        endtag: '// [endinjector]'
      },
      files: {
        '<%= yeogurt.client %>/styles/main.scss': [
          '<%= yeogurt.client %>/styles/**/*.scss',
          '!<%= yeogurt.client %>/styles/main.scss'
        ]
      }
    },
  });

};

module.exports = taskConfig;
