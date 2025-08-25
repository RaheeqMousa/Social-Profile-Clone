import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import browserSync from "browser-sync";
import minifyCSS from 'gulp-clean-css';

const sassCompiler = gulpSass(sass);
const browserS = browserSync.create();

// Compile SCSS to CSS
export function buildStyles() {
  return gulp.src('assets/SCSS/**/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(gulp.dest('assets/CSS'))
    .pipe(browserS.stream());
}

// Watch task
export function watchFiles() {
  browserS.init({
      server: {
        baseDir: "./"
      }
  });

  gulp.watch('assets/SCSS/**/*.scss', buildStyles);
  gulp.watch('*.html').on('change', browserS.reload);
  gulp.watch('assets/JS/**/*.js').on('change', browserS.reload);
  gulp.watch('assets/Images/**/*.{png,jpg,jpeg,gif,svg,webp}')
  .on('change', browserS.reload);
}

// Copy HTML
export function copyHTML() {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
}


export function copyImages() {
  return gulp.src('assets/Images/*', {encoding:false})
    .pipe(gulp.dest('dist/assets/Images'));
}

// Convert SCSS
export function sassConvert() {
  return gulp.src('assets/SCSS/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(minifyCSS({ level: 1 }))
    .pipe(gulp.dest('dist/assets/CSS'));
}

// Concatenate JS
export function scripts() {
  return gulp.src('assets/JS/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/JS'));
}

// Default task
export default gulp.series(
  gulp.parallel(buildStyles, sassConvert, copyHTML, copyImages, scripts),
  watchFiles
);
