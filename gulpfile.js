'use strict'

var gulp = require('gulp');
// var browserSync = require('browser-sync').create();
var browserSync = require('browser-sync'); // Needed to run Live Reload
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var open = require('gulp-open');

var server = require('gulp-express');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var reload = browserSync.reload;


var app_base = './app/';
var dist_path = './dist/';

//defining path
var path = {
  LOCAL_SERVER: 'http://localhost:3001',
  MAIN_CSS: './app/styles/theme/main.css',
  ALL_SASS: './app/sass/**/*.scss',
  MAIN_SASS: './app/sass/theme/main.scss',
  MAIN_JS: './app/scripts/app.js',
  ALL_JS: './app/scripts/**/*.js',
  DEST_PUG: dist_path+'html',
  DEST_CSS: dist_path+'styles',
  DEST_JS: dist_path+'scripts',
  MINIFIED_OUT: 'build.min.js',
  // DEST_SRC: 'dist/src',
  // DEST_BUILD: 'dist/build',
  // DEST: 'dist'
  JSCONCAT : [
  './app/scripts/libs/*.js',
  './app/scripts/namespace.js',
  './app/scripts/helpers.js',
  './app/scripts/init.js',
  './app/scripts/webservices.js',
  './app/scripts/classes/*.js',
  './app/scripts/controllers/*.js'
],
  PUG: app_base+'views/**/*.pug',
  ALL_PUG: app_base+'views/**/*.pug',
  dist_path: './dist/'
};

//task server to run express
gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['app.js']);
});


// JavaScript task
gulp.task('js', function() {
  return gulp.src(path.JSCONCAT)
    .pipe(plumber({
      errorHandler: function(err){
        gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
        this.emit('end');
      }
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(path.DEST_JS))
    .pipe(rename({suffix:".min"}))
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST_JS))
    .pipe(reload({stream: true}));
});

//task html to convert pug to html
gulp.task('html', function() {
  return gulp.src(path.ALL_PUG)
    .pipe(plumber({
      errorHandler: function(err){
        gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
        this.emit('end');
      }
    }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(path.DEST_PUG));
});

//task sass to convert all sass file to css
gulp.task('sass', function(){
  return gulp.src(path.MAIN_SASS)
    .pipe(plumber({
      errorHandler: function(err){
        gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
        this.emit('end');
      }
    }))
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest(path.DEST_CSS))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//task watch to watch sass and html changes TODO BROWSWER SYNC
gulp.task('watch', ['browserSync', 'sass','html', 'pug-watch' ], function (){
  gulp.watch(path.ALL_SASS, ['sass']);
  gulp.watch(path.ALL_JS, browserSync.reload);
  // gulp.watch(path.ALL_PUG, browserSync.reload);
  gulp.watch('app/views/**/*.pug', browserSync.reload);
  // Other watchers
});

// TO DO TASK JS

//task uri to open the environment automatically
gulp.task('uri', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:3000'}));
});

gulp.task('pug-watch', ['html'], reload);

// task default
gulp.task('default', ['sass','js','server'], function () {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 3000,  // use *different* port than above
    notify: true
  })

  gulp.watch(path.ALL_SASS, ['sass']);
  gulp.watch(path.ALL_JS, ['js']);
  gulp.watch(path.ALL_PUG, ['pug-watch']);
  gulp.watch(['app.js', 'app/routes/**/*.js', 'app/controllers/*.js'], [server.run]);
});
