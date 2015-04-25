// Load plugins
var gulp    = require('gulp');
var sass    = require('gulp-ruby-sass');


// Styles
gulp.task('sass', function() {
    return sass('scss/main.scss')
    .on('error', function (err) {console.error('Error!', err.message);})
    .pipe(gulp.dest(''))
});


// //Scripts
// gulp.task('scripts', function() {
//   gulp.src(allScripts)
//     .pipe(concat('all.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(themeFolder + '/dist/'))
// });


// Watch
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});


// Default task
gulp.task('default', function() {
    'sass',
    'watch'
});