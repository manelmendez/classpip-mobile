/*eslint-env node*/

var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function() {
  return del('www/build');
});
