// Configuration for jade task(s)
// Compile jade templates to single `.js` file
// using the JST namespace (accessible via window.JST)
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('jade', {
    server: {
      options: {
        pretty: true,
        client: true,
        data: {
          debug: true
        }
      },
      files: {
        '<%= yeogurt.tmp %>/templates/templates.js': ['<%= yeogurt.client %>/templates/**/*.jade']
      }
    },
    dist: {
      options: {
        pretty: false,
        client: true,
        data: {
          debug: false
        }
      },
      files: {
        '<%= yeogurt.tmp %>/templates/templates.js': ['<%= yeogurt.client %>/templates/**/*.jade']
      }
    },
    test: {
      options: {
        pretty: true,
        client: true,
        data: {
          debug: true
        }
      },
      files: {
        'test/scripts/templates.js': ['<%= yeogurt.client %>/templates/**/*.jade']
      }
    }
  });

};

module.exports = taskConfig;
