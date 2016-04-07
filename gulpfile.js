var gulp = require('gulp'),
    // ngAnnotate = require('browserify-ngannotate'),
    // cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    add = require('gulp-add-src'),
    // htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    runSequence = require('run-sequence'),
    del = require('del');

gulp.task('css', function() {
  return gulp.src('src/css/**')
    .pipe(concat('base.css'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    // .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('lint', function () {
    return gulp.src('src/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('html', function () {
    return gulp.src(['src/tmpls/base.html'])
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/assets'))
    .pipe(notify({ message: 'HTML task complete' }));
});

// gulp.task('annotate', function () {
//     return gulp.src('src/js/*.js')
//     .pipe(ngAnnotate())
//     .pipe(gulp.dest('src/js/*.js'));
// });

gulp.task('font', function () {
    return gulp.src(['src/fonts/**'])
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('tmpls', function () {
  return gulp.src('src/tmpls/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('src/js/angulars/configs'));
});


gulp.task('js', ['lint', 'tmpls'], function() {

  return gulp.src(['src/js/app.js'])
    .pipe(browserify({
        debug: true,
        insertGlobals: true
    }))
    .pipe(add.append('src/js/angulars/modules/*.js'))
    .pipe(add.append(['src/js/angulars/**/*.js', '!src/js/angulars/modules/*.js']))
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'JS task complete' }));
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'IMG task complete' }));
});

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('all', ['clean'], function() {
  return gulp.start('css', 'js', 'img', 'html', 'font');
});

gulp.task('default', ['all'], function() {
  runSequence('deploy', 'watch');
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


  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']);
});

gulp.task('deploy', function () {
  return gulp.src('dist/**/**')
    .pipe(gulp.dest('../bs/public/MafSite/'))
    .pipe(livereload())
    .pipe(notify({ message: 'Deploy task complete' }));
});