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


// ========== JS TASKS =============
// lints js code with jshint
gulp.task('lint', function () {
    return gulp.src(['src/js/**/*.js', '!src/js/lib/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// create tamplate cache
gulp.task('tmpls', ['lint'], function () {
  return gulp.src('src/tmpls/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('src/js/angulars/configs'));
});

// this task build all angular modules to ng.min,js
gulp.task('js-ng-app', ['tmpls'], function () {
    return gulp.src(['src/js/angulars/modules/*.js'])
    .pipe(add.append(['src/js/angulars/**/*.js', '!src/js/angulars/modules/*.js']))
    .pipe(concat('ng.js'))
    .pipe(gulp.dest('dest/assets/js'))
    .pipe(_if(isProduction, uglify(), beautify()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dest/assets/js'));
});

//this task collect all libs
gulp.task('js-lib', function () {
  return gulp.src(['src/js/app.js'])
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
    return gulp.src(['src/fonts/**'])
    .pipe(gulp.dest('dest/assets/fonts'));
});

// this task minify images
gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dest/assets/img'));
});

// minifies html
gulp.task('html', function () {
    return gulp.src(['src/tmpls/base.html'])
    .pipe(_if(isProduction, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dest/assets'));
});

//collects all css files and concat them
gulp.task('css', function() {
  return gulp.src('src/css/main.min.css')
    .pipe(add.append(['src/css/**', '!src/css/main.min.css']))
    .pipe(concat('base.css'))
    .pipe(gulp.dest('dest/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(_if(isProduction, cssnano(), cssbeautify()))
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
  gulp.watch('src/css/**/*.css', reactOn('css'));

  // Watch .js files
  gulp.watch(['src/js/**/*.js', 'src/tmpls/pages/**/*.html', '!src/js/angulars/configs/templates.js'], reactOn('js'));

  // Watch image files
  gulp.watch('src/img/**/*', reactOn('img'));

  // Watch image files
  gulp.watch('src/tmpls/base.html', reactOn('html'));


  // Watch any files in dest/, reload on change
  gulp.watch(['dest/**']);
});

gulp.task('deploy', function () {
  return gulp.src('dest/**/**')
    .pipe(gulp.dest('../bs/public/MafSite/'))
    .pipe(livereload())
    .pipe(notify('Code deployed to server!'));
});
