// grab our packages
var gulp   = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    minifyJavaScript = require('gulp-minify'),
    preprocess = require('gulp-preprocess'),
    open = require('gulp-open');

gulp.task('dev', ['minify-css', 'minify-html', 'minify-javascript']);

gulp.task('prod', ['set-prod-node-env','html','img','minify-css', 'minify-javascript', 'open']);

gulp.task('minify-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

//gulp.task('minify-html', function() {
//    var opts = {
//        conditionals: true,
//        spare:true
//    };
//
//    return gulp.src('index.html')
//        .pipe(minifyHTML(opts))
//        .pipe(gulp.dest('index.html'));
//});

gulp.task('minify-javascript', function(){
    gulp.src('src/js/*.js')
        .pipe(minifyJavaScript())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('open', function(){
    gulp.src('dist/index.html')
        .pipe(open());
});

gulp.task('img', function(){
   gulp.src('src/img/*')
       .pipe(gulp.dest('./dist/img'));
});

gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };
    gulp.src('src/*.html')
        .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}})) //To set environment variables in-line
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'))
});
