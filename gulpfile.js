/* eslint-env node */

'use strict';

// var config = {};
var KarmaServer = require('karma').Server;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var hbsfy = require('hbsfy');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Bundle files with browserify
gulp.task('browserify', function () {
  // set up the browserify instance on a task basis
  var bundler = browserify({
    entries: 'app/scripts/app.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify, hbsfy]
  });

  bundler = watchify(bundler);

  var rebundle = function() {
    return bundler.bundle()
      .on('error', $.util.log)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on('error', $.util.log)
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('.tmp/scripts'));
  };

  bundler.on('update', rebundle);

  return rebundle();
});

gulp.task('copy:env', function() {
  gulp.src(['environment.json'])
  .pipe(gulp.dest('.tmp/'));
});
gulp.task('copy:env:dist', function() {
  gulp.src(['environment.json'])
  .pipe(gulp.dest('dist'));
});
// Bundle files with browserify for production
gulp.task('browserify:dist', function () {
  // set up the browserify instance on a task basis
  var bundler = browserify({
    entries: 'app/scripts/app.js',
    // defining transforms here will avoid crashing your stream
    transform: [babelify, hbsfy]
  });

  return bundler.bundle()
    .on('error', $.util.log)
    .pipe(source('app.js'))
    .pipe(buffer())
    //.pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'));
});

// Lint Javascript
gulp.task('lint', function () {
  return gulp.src([
    'app/scripts/**/*.js',
    '!app/scripts/config.js',
    '!app/scripts/vendor/**/*.js',
    '!app/scripts/library/**/*.js', // exclude
  ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// Optimize assets
gulp.task('assets', function () {
  return gulp.src('app/assets/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets'))
    .pipe($.size({title: 'assets'}));
});

// Optimize images
gulp.task('images', function () {
  return gulp.src('app/assets/img/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe($.size({title: 'images'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src([
    'app/assets/fonts/**/*',
    'app/assets/icons/**/*',
    'app/{,styles/}fonts/**/*',
    // 'node_modules/bootstrap/dist/fonts/**/*'
  ])
    .pipe($.flatten())
    .pipe(gulp.dest('dist/assets/fonts'));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  return gulp.src([
    'app/assets/css/bootstrap.min.css',
    'app/assets/css/main.css',
  ])
    .pipe($.sourcemaps.init())
    .pipe($.postcss([
      require('autoprefixer')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/assets/css'))
    .pipe(reload({ stream: true }));
});

// Scan your HTML for assets & optimize them
gulp.task('html', ['styles'], function () {
  return gulp.src('app/*.html')
    .pipe($.htmlReplace())
    .pipe($.useref())
    .pipe($.if('*.css', $.csso()))
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

// Clean output directory and cached images
gulp.task('clean', function (callback) {
  var del = require('del');
  del(['.tmp', 'dist'], function () {
    $.cache.clearAll(callback);
  });
});

// Copy assets to distribution path
gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

// Copy libraries to distribution path
gulp.task('library', function () {
  return gulp.src([
    'app/library/*',
  ], {
    dot: true
  }).pipe(gulp.dest('dist/library'));
});

// Run karma for development, will watch and reload
gulp.task('tdd', function(callback) {
  var karma = new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, callback);

  karma.start();
});

// Run tests and report for ci
gulp.task('test', function(callback) {
  var karma = new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputFile: '.tmp/test-results.xml'
    }
  }, callback);

  karma.start();
});

// Run development server environmnet
gulp.task('serve', ['styles', 'browserify', 'copy:env'], function () {
  browserSync({
    browser: 'google chrome',
    notify: false,
    port: 9000,
    ui: {
      port: 9001
    },
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/node_modules': 'node_modules',
        '/app': 'app', // add css files from app directory
      }
    },
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    // 'app/scripts/**/*.js',
    // 'app/images/**/*',
    // browserify zaten tmp'ye build ediyor,
    // yukarıdakilerle beraber browser  iki kere reload çalışıyor
    '.tmp/scripts/**/*.js'
  ]).on('change', reload);

  gulp.watch('app/assets/**/*.css', ['styles']);
});

// Run web server on distribution files
gulp.task('serve:dist', function() {
  browserSync({
    browser: 'google chrome',
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
      routes: {
        '/node_modules': 'node_modules',
        '/app': 'app', // add css files from app directory
      }
    }
  });
});

// Build the project for distribution
gulp.task('build', ['lint', 'browserify:dist', 'html', 'images', 'fonts', 'extras', 'library', 'assets', 'copy:env:dist'], function () {
  var size = $.size({title: 'build', gzip: true });
  return gulp.src('dist/**/*')
    .pipe(size)
    .pipe($.notify({
      onLast: true,
      title: 'Build complete',
      message: function() {
        return 'Total scripts size (gzip) ' + size.prettySize;
      }
    }));
});

// Clean all and build from scratch
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
