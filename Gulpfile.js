// grab our packages
var gulp   = require('gulp'),
    minifyHTML = require('gulp-minify-html');
    minifyCss = require('gulp-minify-css');

gulp.task('default', ['minify-css', 'minify-html']);

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('css'));
});

gulp.task('minify-html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    return gulp.src('index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('index.html'));
});
