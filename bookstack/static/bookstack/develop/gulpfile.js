var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('reactor', function() {
    var b = browserify({
        standalone: 'bookstack'
    });
    b.transform(reactify);
    b.add('./js/react/main.js');
    return b.bundle()
        .pipe(source('../js/dist/bundle.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('./js/**/*.{js,jsx}', ['reactor']);
});

gulp.task('compress', function() {
    return gulp.src('../js/dist/bundle.js')
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('../js/dist/'));
});

gulp.task('build', ['reactor']);

gulp.task('default', ['watch']);