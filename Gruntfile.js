/*
 * grunt-deployment
 * 
 *
 * Copyright (c) 2014 Philipp Waldmann
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  process.env.NODE_ENV = 'test';


  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  var base = process.cwd();

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        base + '/gruntfile.js',
        base + '/app/**/*.js',
        base + '/config/**/*.js',
      ],
      options: {
        jshintrc: base + '/.jshintrc'
      }
    },
  
    mochaTest: {
      test: {
        src: 'test/*',
        options: {
          reporter: 'spec',
          recursive: true
        },
      },
    
      coverage: {
        src: 'test/*',
        options: {
          recursive: true,
          require: 'blanket'
        },
      }
    }
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint:all', 'mochaTest:test', 'mochaTest:coverage']);

  // By default, lint and run all tests.
  grunt.registerTask('ci', ['test']);

};
