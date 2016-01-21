var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require("gulp-open"),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	port = process.env.port||3031;

gulp.task('browserify',function(){
	gulp.src('./app/src/js/components/main.js')
		.pipe(browserify({ transform : 'reactify'}))
		.pipe(gulp.dest('./app/dist/js'));
});

//this is to launch in a port like localhost3031
gulp.task('open',function(){
	var options = {
		url : 'http://localhost' + port,
	};
	gulp.src('.app/index.html')
	.pipe(open('',options));
});

// reflect the cahnges live ; no need to referesh

gulp.task('connect',function(){
	connect.server({
		root: 'app',
		port: port,
		livereload : true
	});
});

// live reload for js
gulp.task('js',function(){
	gulp.src('./app/dist/**/*.js')
	.pipe(connect.reload());
});

// live reload for html
gulp.task('html',function(){
	gulp.src('./app/*.html')
	.pipe(connect.reload());
});
gulp.task('css',function(){
	gulp.src('./app/src/css/*.css')
	.pipe(connect.reload());
});

//watch for live reload
gulp.task('watch',function(){
	gulp.watch('app/dist/js/*.js',['js']);
	gulp.watch('app/index.html',['html']);
	gulp.watch('app/src/css/main.css',['css']);
	gulp.watch('app/src/js/**/*.js',['browserify']);
});

gulp.task('default',['browserify']);

gulp.task('serve',['browserify','connect','open','watch']);
