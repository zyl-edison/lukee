'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const git = require('gulp-git');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');

// Shared tasks
gulp.task('init', shell.task(['mkdir -p ./log/app', 'touch ./log/traffics.log']));

gulp.task('systemInit', () => {
  global.LUKEE = {};

  const System = require('./system');
  const sys = new System();

  sys.init();
});

gulp.task('systemStart', () => {
  LUKEE.server.get('apiServer').start();
  LUKEE.server.get('databaseServer').start();
});

// Development
gulp.task('lint', () => {
  return gulp
          .src([
            './index.js',
            './gulpfile.js',
            './application/**/*.js',
            './system/**/*.js',
            '!./system/coverage/**/*.js'
          ])
          .pipe(jshint())
          .pipe(jshint.reporter(stylish));
});

gulp.task('devServer', () => {

  const stream = nodemon({
    script: 'index.js',
    ext: 'js',
    tasks: ['lint'],
    env: {
      NODE_SERVER_ENV: 'development'
    }
  });

  stream.on('restart', () => {
    console.log('restarted!');
  }).on('crash', () => {
    console.error('Application has crashed!\n');
    stream.emit('restart', 10);
  });
});

gulp.task('develop', ['init', 'lint', 'devServer']);

// Test
gulp.task('test', callback => {
  process.env.NODE_SERVER_ENV = 'test';
  runSequence('systemInit', 'systemStart', callback);
});

// Production
gulp.task('production', callback => {
  process.env.NODE_SERVER_ENV = 'production';
  runSequence('systemInit', 'systemStart', callback);
});


// Framework Upgrade
gulp.task('copyFramework', () => {
  return gulp
          .src([
            'lukee/**/*',
            '!lukee/.git',
            '!lukee/.git/**/*',
            '!lukee/log',
            '!lukee/log/**/*',
            '!lukee/application',
            '!lukee/application/**/*',
          ])
          .pipe(gulp.dest(__dirname));
});

gulp.task('removeClonedFramework', () => {
  return gulp
          .src('lukee', {read: true})
          .pipe(clean());
});

gulp.task('upgrade', callback => {
  return git.clone('https://gitlab.com/turbo-ads/lukee.git', (err) => {
    if (err) throw err;

    runSequence('copyFramework', 'removeClonedFramework', callback);
  });
});
