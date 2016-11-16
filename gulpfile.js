var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concatCss = require('gulp-concat-css');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

gulp.task('default', function() {
  // place code for your default task here
  gulp.watch('./app/less/*.less', ['less', 'concat-css']);
  gulp.watch('./app/**/*.js', browserSync.reload);
  gulp.watch('./app/**/*.html', browserSync.reload);
});

gulp.task('less', function() {
	console.log("watching for less files!");
	return gulp.src('./less/**/*.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('concat-css', function() {
	console.log("concating css files!");
	return gulp.src('./app/css/*.css')
		.pipe(concatCss('./app/app.css'))
		.pipe(gulp.dest(''))
		.pipe(browserSync.reload({
      stream: true
    }));
})