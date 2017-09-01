var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

gulp.task('css', function () {
  gulp.src('./src/css/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
  gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('utils', function () {
  gulp.src('./src/utils/*.js')
    .pipe(gulp.dest('./public/js'))
})

gulp.task('node', function () {
  nodemon({
    script: './app.js',
    ignore: [
      'node_modules/',
      'public/',
      'views/',
      'src/'
    ]
  })
})

gulp.task('reload', function () {
  reload();
})

gulp.task('default', ['js', 'css', 'node', 'utils'], function () {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 3001
  })

  gulp.watch('./src/css/*.scss', ['css', 'reload']);
  gulp.watch('./src/js/*.js', ['js', 'reload']);
  gulp.watch('./views/*.pug', ['reload'])
})