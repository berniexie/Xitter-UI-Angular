var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
		concat = require('gulp-concat'),
		watch = require('gulp-watch'),
		browserSync = require('browser-sync'),
		browserify = require('gulp-browserify'),
		embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
		express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 8000;

gulp.task('default', ['connect', 'watch']);

var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist' });
});

gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  // Watch our scripts
  gulp.watch(['app/**/*.js', 'app/*.js'],[
    'browserify'
  ]);
});

gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));
  // Any other view files from app/views
  gulp.src('./app/components/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/'));

  //temporarily here!! --------------------------------------------
  gulp.src('./app/app.css')
  .pipe(gulp.dest('dist/'));
});

gulp.task('bower', function() {
	gulp.src([
    './app/bower_components/**/*min.js',
    './app/bower_components/**/*min.css',
    './app/bower_components/**/*.map'
    ])
	.pipe(gulp.dest('dist/bower_components'));
});
// gulp.task('watch', function() {
//   gulp.watch('./app/less/*.less', ['less', 'concat-css']);
//   gulp.watch('./app/**/*.js', browserSync.reload);
//   gulp.watch('./app/**/*.html', browserSync.reload);
// })

gulp.watch(['app/index.html', 'app/components/**/*.html', 'app/app.css'], [
  'views'
]);

// gulp.task('less', function() {
// 	console.log("watching for less files!");
// 	return gulp.src('./less/**/*.less')
// 		.pipe(less({
// 			paths: [path.join(__dirname, 'less', 'includes')]
// 		}))
// 		.pipe(gulp.dest('./app/css'))
// 		.pipe(browserSync.reload({
//       stream: true
//     }));
// });

// gulp.task('concat-css', function() {
// 	console.log("concating css files!");
// 	return gulp.src('./app/css/*.css')
// 		.pipe(concatCss('./app/app.css'))
// 		.pipe(gulp.dest(''))
// 		.pipe(browserSync.reload({
//       stream: true
//     }));
// })

gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
});

gulp.task('default', ['dev', 'browserify', 'views', 'bower', 'watch']);