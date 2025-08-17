const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// compile SCSS to CSS
function buildStyles() {
    return gulp.src('assets/SCSS/**/*.scss')  // source folder
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('assets/CSS')); // output folder
}

// watch task
function watchFiles() {
  gulp.watch('assets/SCSS/**/*.scss', buildStyles);
}

// exports
exports.buildStyles = buildStyles;
exports.watch = watchFiles;
exports.default = gulp.series(buildStyles, watchFiles);
