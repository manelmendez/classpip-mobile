/*eslint-env node*/

var gulp = require('gulp');
var del = require('del');

gulp.task('clean', ['clean-build', 'clean-images']);

gulp.task('clean-build', function() {
  return del('www/build');
});

gulp.task('clean-images', function() {
  return del('www/images');
});