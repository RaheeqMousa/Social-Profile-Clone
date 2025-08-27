import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { rollup } from 'rollup';
import concat from 'gulp-concat'
import browserSync from "browser-sync";
import minifyCSS from 'gulp-clean-css';
import htmlreplace from 'gulp-html-replace';

const sassCompiler = gulpSass(sass);
const browserS = browserSync.create();

// Compile SCSS to CSS
export function buildStyles() {
  return gulp.src('src/SCSS/**/*.scss')
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

  gulp.watch('src/SCSS/**/*.scss', buildStyles);
  gulp.watch('*.html').on('change', browserS.reload);
  gulp.watch('assets/JS/**/*.js').on('change', browserS.reload);
  gulp.watch('assets/Images/**/*.{png,jpg,jpeg,gif,svg,webp}')
  .on('change', browserS.reload);
}

// Copy HTML
export function copyHTML() {
  return gulp.src('*.html')
    .pipe(htmlreplace({
      css: 'assets/CSS/main.min.css',
      js:{
        src:'assets/JS/main.min.js',
        tpl:'<script type="module" src="%s"></script>'
      } 
    }))
    .pipe(gulp.dest('dist'));
}


export function copyImages() {
  return gulp.src('assets/Images/*', {encoding:false})
    .pipe(gulp.dest('dist/assets/Images'));
}

// Convert SCSS
export function sassConvert() {
  return gulp.src(['src/SCSS/base.scss', 'src/SCSS/main.scss'])
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(concat("main.min.css"))
    .pipe(minifyCSS({ level: 1 }))
    .pipe(gulp.dest('dist/assets/CSS'));
}

// Concatenate JS
export async function scripts() {
  // Create Rollup bundle
  const bundle = await rollup({
    input: 'assets/JS/main.js',
    plugins: [
      resolve(),//resolve imports
      terser() //minify
    ]
  });

  await bundle.write({
    file: 'dist/assets/JS/main.min.js',
    format: 'es',
  });

  await bundle.close();
}

export const dev=gulp.series(watchFiles);
export const build=gulp.series(gulp.parallel(buildStyles, sassConvert, copyHTML, copyImages, scripts));