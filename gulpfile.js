var isProduction = false;
var gulp = require('gulp'),
    _if = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    cssbeautify = require('gulp-cssbeautify'),
    jshint = require('gulp-jshint'),
    beautify = require('gulp-beautify'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    add = require('gulp-add-src'),
    htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    runSequence = require('run-sequence'),
    del = require('del');

// var jsFiles =
// ========== JS TASKS =============
// lints js code with jshint
gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', '!src/lib/**/*'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// create tamplate cache
gulp.task('tmpls', ['lint'], function () {
  return gulp.src([
      'src/components/**/*.html',
      'src/pages/**/*.html',
    ])
    .pipe(templateCache())
    .pipe(gulp.dest('src/configs'));
});

// this task build all angular modules to ng.min,js
gulp.task('js-ng-app', ['tmpls'], function () {
    return gulp.src(['src/**/*module.js', '!src/lib/**', '!src/app.js'])
    .pipe(add.append(['src/**/*.js', '!src/**/*module.js', '!src/lib/**', '!src/app.js']))
    .pipe(concat('ng.js'))
    .pipe(_if(isProduction, uglify(), beautify()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dest/assets/js'));
});

//this task collect all libs
gulp.task('js-lib', function () {
  return gulp.src(['src/app.js'])
    .pipe(browserify({
        debug: true,
        insertGlobals: true
    }))
    .pipe(_if(isProduction, uglify(), beautify()))
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest('dest/assets/js'));
});

// this task unite ng-modules and libs
gulp.task('js',['js-ng-app', 'js-lib'] ,function() {
  return gulp.src('dest/assets/js/libs.min.js')
    .pipe(add.append('dest/assets/js/ng.min.js'))
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dest/assets/js'));
});



// ============ OTHER ASSESTS TASK ============
// copies fonts from src to dest
gulp.task('font', function () {
    return gulp.src(['src/assets/fonts/**'])
    .pipe(gulp.dest('dest/assets/fonts'));
});

// this task minify images
gulp.task('img', function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dest/assets/img'));
});

// minifies html
gulp.task('html', function () {
    return gulp.src(['src/app.html'])
    .pipe(_if(isProduction, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dest/assets'));
});

//collects lib css files and concat them
gulp.task('css-lib', function() {
  return gulp.src([
      'src/lib/bootstrap-css/css/bootstrap.css',
      'src/lib/angular-autocomplete/style/autocomplete.css',
    ])
    .pipe(concat('lib.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(_if(isProduction, cssnano(), cssbeautify()))
    .pipe(gulp.dest('dest/assets/css'));
});

//collects custom css files and concat them
gulp.task('css-custom', function() {
  return gulp.src(['src/**/*.css','!src/lib/**/*'])
    .pipe(concat('custom.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(_if(isProduction, cssnano(), cssbeautify()))
    .pipe(gulp.dest('dest/assets/css'));
});

// this task unite ng-modules and libs
gulp.task('css',['css-custom', 'css-lib'] ,function() {
  return gulp.src('dest/assets/css/lib.min.css')
    .pipe(add.append('dest/assets/css/custom.min.css'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('dest/assets/css'));
});

gulp.task('clean', function() {
    return del(['dest']);
});

gulp.task('all', [ 'js', 'css', 'img', 'html', 'font']);

gulp.task('default', ['clean'], function() {
  runSequence('all', 'deploy', 'watch');
});



//GENERAL WATCHER
function reactOn(task) {
  return function reacter() {
    runSequence(task, 'deploy');
  };
}

// watchers
gulp.task('watch', function() {
  // Create LiveReload server
 livereload.listen({
  start: true,
  port: 8030,
  host: 'localhost'
 });

  // Watch .scss files
  gulp.watch('src/**/*.css', reactOn('css'));

  // Watch .js files
  gulp.watch(['src/**/*.js', '!src/configs/templates.js'], reactOn('js'));

  // Watch .js files
  gulp.watch(['src/configs/templates.js'], reactOn('js'));

  // Watch image files
  gulp.watch('src/assets/img/**/*', reactOn('img'));

  // Watch main html files
  gulp.watch('src/app.html', reactOn('html'));

  // Watch main tmpls files
  gulp.watch([
      'src/components/**/*.html',
      'src/pages/**/*.html',
    ], reactOn('tmpls'));

  // Watch any files in dest/, reload on change
  // gulp.watch(['dest/**']);
});

gulp.task('deploy', function () {
  return gulp.src('dest/**/**')
    .pipe(gulp.dest('../bs/public/MafSite/'));
});
