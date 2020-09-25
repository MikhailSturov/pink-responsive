const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const mqpacker = require("css-mqpacker");
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const jsmin = require('gulp-jsmin');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();

// Очищение папки build
function clean () {
  return del(['build'])
}

// Сборка стилей
function style () {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(concat('style.scss'))
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowsers: ['last 2 versions'],
    cascade: false
   }))
  .pipe(postcss([
    mqpacker({
      sort: false //true сортирует медиастили по порядку
    })
  ]))
  .pipe(gulp.dest('./src/css'))//несжатый CSS
  .pipe(browserSync.stream())
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("./src/css"));//сжатый CSS
}

//Копирование и минификация JS
function js () {
  return gulp.src("./src/js/scripts/*.js")
    .pipe(concat('script.js'))
    .pipe(jsmin())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("./src/js"));
};

//Копирование всехфайлов в папку build
function copy () {
  return gulp.src([
          "./src/fonts/**/*.{woff,woff2}",
          "./src/img/**",
          "./src/css/style.min.css",
          "./src/js/script.min.js",
          "./src/*.html"
     ], {
       base: "./src"
     })
     .pipe(gulp.dest("build"));
};

// Функция автообновления
function watch () {
  browserSync.init({
    server: {
        baseDir: "./src/"
    }
  });

  gulp.watch('./src/js/scripts/*.js', js);
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/**/*.js').on('change',browserSync.reload);
  gulp.watch('./src/**/*.css').on('change',browserSync.reload);
  gulp.watch('./src/*.html').on('change',browserSync.reload);
}


gulp.task('style', style);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('js', js);
gulp.task('copy', copy);

//Сборка всех файлов в папку build
gulp.task('build', gulp.series(clean, gulp.parallel(style,js,copy)));
//gulp.task('dev', gulp.series('build','watch'));
//gulp.watch('./src/scss/**/*.scss', gulp.series('style'));


