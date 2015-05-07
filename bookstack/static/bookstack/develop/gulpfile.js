var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');


gulp.task('sassify', function(){
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../css'))
        .pipe(livereload());
});

gulp.task('reactor', function() {
    var b = browserify();
    b.transform(reactify);
    b.add('./js/react/main.js');
    return b.bundle()
        .pipe(source('../js/dist/bundle.js'))
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('./js/react/**/*.{js,jsx}', ['reactor']);
    gulp.watch('./sass/*.scss', ['sassify']);
});

gulp.task('default', ['watch']);