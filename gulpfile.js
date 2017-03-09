const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const TRANSPILE_DEST_DIR = './dist';

gulp.task('transpile', function () {
  return gulp.src('lib/client.js')
    .pipe(babel({ "presets": ["es2015"] }))
    .pipe(gulp.dest(TRANSPILE_DEST_DIR));
});

gulp.task('clean', function () {
  return del([TRANSPILE_DEST_DIR]);
});

gulp.task('default', ['transpile']);