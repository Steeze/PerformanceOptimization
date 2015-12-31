// grab our packages
var gulp   = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    minifyJavaScript = require('gulp-minify'),
    preprocess = require('gulp-preprocess'),
    open = require('gulp-open');

gulp.task('prod', ['html','img','minify-css', 'minify-javascript', 'open']);

gulp.task('minify-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-javascript', function(){
    gulp.src('src/js/*.js')
        .pipe(minifyJavaScript())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('open', function(){
    gulp.src('dist/index.html')
        .pipe(open());
});

gulp.task('img', function(){
   gulp.src('src/img/*')
       .pipe(gulp.dest('dist/img'));
});

gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };
    gulp.src('src/*.html')
        .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}})) //To set environment variables in-line
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/'))
});
