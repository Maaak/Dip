var nib = require("nib");
var gulp = require("gulp");
var jade = require("gulp-jade");
var	stylus = require("gulp-stylus");
/*var	jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");*/
var addsrc = require("gulp-add-src");
/*var replace = require("gulp-replace");
var plumber = require("gulp-plumber");
var stylish = require("jshint-stylish");
var requirejs = require("gulp-requirejs");*/



var paths = {
				  styl: [ "Contents/**/*.styl" ],

				  jade: [ "Contents/**/*.jade" ],

			static_css: [ "Contents/public/font-awesome.min.css",
						  "Contents/public/alertify-theme.css",
						  "Contents/public/alertify.css",
						  "Contents/public/hint.css" ]
};

gulp.task("styles", function () {
	gulp.src(paths.styl)
		.pipe(stylus({ use: nib(), compress: true }))
		.pipe(addsrc(paths.static_css))
		.pipe(gulp.dest("contents/css/"))
});

gulp.task("jade", function () {
	gulp.src(paths.jade)
		.pipe(jade())
		.pipe(gulp.dest('contents/templates'))
});


gulp.task("watch", function () {
	gulp.watch(paths.styl, ["styles"]);
	gulp.watch(paths.jade, ["jade"]);
});

gulp.task("deploy", ["styles", "rjs"]);
gulp.task("debug", ["styles", "scripts", "watch"]);
gulp.task("default", ["styles", "scripts", "rjs"]);