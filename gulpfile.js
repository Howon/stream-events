//http://www.smashingmagazine.com/2014/06/11/building-with-gulp/

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	del = require('del'),
    browserify = require('gulp-browserify'),
    react = require('gulp-react');

gulp.task('compile_jsx', function(){
	gulp.src('scripts/render/components/*.jsx')  
		.pipe(react())                
		.pipe(gulp.dest('scripts/render/components/js'));
		
	gulp.src('scripts/render/pages/event/*.jsx')  
		.pipe(react())                
		.pipe(gulp.dest('scripts/render/pages/event'));

	gulp.src('scripts/render/pages/main/*.jsx')  
		.pipe(react())                
		.pipe(gulp.dest('scripts/render/pages/main'));
})

gulp.task('scripts', function () {
    return gulp.src(['scripts/render/*.js'])
    .pipe(browserify({
        debug: true,
        transform: [ 'reactify' ]
    }))
    .pipe(gulp.dest('./public/javascripts/pages/'));
});

gulp.task('minify_js', ['clean'], function(done) {
	return gulp.src('./public/javascripts/pages/main/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(rename('minified_main.js'))
	.pipe(gulp.dest('./public/javascripts/pages/main/'));
});

gulp.task('minify_css', ['clean'], function() {
    return gulp.src('./public/stylesheets/pages/main/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('minified_main.css'))
    .pipe(gulp.dest('./public/stylesheets/pages/main'));
});

gulp.task('clean', function(cb){
	del([ './public/javascripts/pages/main/minified_main.js',
		  './public/stylesheets/pages/main/minified_main.css'
	], cb);
});

gulp.task('default', ['compile_jsx', 'scripts', 'minify_js', 'minify_css']);
//gulp.task('default', ['compile_jsx', 'scripts']);

