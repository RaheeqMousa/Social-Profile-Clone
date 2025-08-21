import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

const sassCompiler = gulpSass(sass);

// Compile SCSS to CSS
export function buildStyles() {
  return gulp.src('assets/SCSS/**/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(gulp.dest('assets/CSS'));
}

// Watch task
export function watchFiles() {
  gulp.watch('assets/SCSS/**/*.scss', buildStyles);
}

// Copy HTML
export function copyHTML() {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
}

// Minimize images
export function imageMin() {
  return gulp.src('assets/images/*')
    .pipe(gulp.dest('dist/assets/Images'));
}

// Convert SCSS
export function sassConvert() {
  return gulp.src('assets/SCSS/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(gulp.dest('dist/assets/CSS'));
}

// Concatenate JS
export function scripts() {
  return gulp.src('assets/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/JS'));
}

// Default task
export default gulp.series(
  gulp.parallel(buildStyles, sassConvert, copyHTML, imageMin, scripts),
  watchFiles
);
