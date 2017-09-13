var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jsValidate = require('gulp-jsvalidate');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');

var path = {
    css: 'css',
    js: 'js'
};

/*
 * Compile Sass files
 */
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('sass', function () {
    return gulp.src(path.css + '/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            style: 'compressed',
        }).on('error', $.notify.onError(function (error) {
            return "Problem file : " + error.message;
        })))
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(path.css))
        .pipe($.notify("Sass Task finished !"));
});


gulp.task('minified', function (done) {
    gulp.src([path.css + "/*.css", "!" + path.css + "/*.min.css"])
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(path.css))
        .on('end', done);
});

gulp.task('clean', function () {
    return gulp.src(path.css + "/*.min.css", {read: false})
        .pipe(clean());
});

/*
 * Check JavaScript errors
 */
gulp.task('check-js', function () {
    return gulp.src(path.js + '/**/*.js')
        .pipe(jsValidate())
        .on("error", $.notify.onError(function (error) {
            return error.message;
        }))
        .pipe($.notify("JS is OK !"));
});

/*
 * Browser Sync
 */
gulp.task('browser-sync', function () {
    browserSync.init([path.css + '**/*.scss'], {
        notify: false,
        proxy: "arval-master.dev",
        baseDir: "/"
    });
});


gulp.task('default', function () {
    gulp.watch(path.css + '/**/*.scss', ['sass']);
    gulp.watch(path.js + '/**/*.coffee', ['coffee']);
});

gulp.task('watch', ['sass', 'browser-sync'], function () {
    gulp.watch(path.css + '**/*.scss', ['sass']);
});

gulp.task('css', ['sass', 'minified']);