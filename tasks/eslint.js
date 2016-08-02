/*eslint-env node*/

var gulp = require('gulp');
var eslint = require('ionic-gulp-eslint');

gulp.task('eslint', eslint);

gulp.task('eslint', function() {
  return eslint({
    src: ['app/**/*.js','tasks/**/*.js']
  });
});
