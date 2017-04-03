'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('init', shell.task(['mkdir -p ../log/app', 'touch ../log/traffics.log']));

// Test
const nodeModuleBin = '../node_modules/.bin/';
const parserNycParams = options => {
  let list = [];

  Object.keys(options).forEach(k => {
    const val = options[k];
    if (Array.isArray(val)) {
      val.forEach(item => {
        list.push('--' + k + '=' + item);
      });
    } else {
      list.push('--' + k + '=' + options[k]);
    }
  });

  return list.join(' ');
};

// System Unit Test
const unitTestFilesSrc = [
  'test/unit-test/*.test.js',
  'test/unit-test/**/*.test.js'
];

const nycParams = {
  lines: 99,
  statements: 99,
  functions: 99,
  branches: 99,
  'check-coverage': true,
  reporter: ['lcov', 'text-summary'],
  include: ['system/**/*.js'],
  exclude: ['system/test/**/*.js'],
  'report-dir': 'coverage'
};
const unitTestCommand = `${nodeModuleBin}nyc ${parserNycParams(nycParams)} ${nodeModuleBin}mocha ${unitTestFilesSrc.join(' ')} --timeout 10000`;
gulp.task('unitTest', shell.task(unitTestCommand));

// System Endpoint Test
const endpointTestFilesSrc = ['test/endpoint-test/**/*.test.js'];
const endpointTestCommand = `${nodeModuleBin}mocha ${endpointTestFilesSrc.join(' ')} --timeout 10000`;
gulp.task('endpointTest', shell.task(endpointTestCommand));

gulp.task('test', ['init', 'unitTest', 'endpointTest']);
