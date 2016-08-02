/*eslint-env node*/

var gulp = require('gulp');
var tslint = require('ionic-gulp-tslint');

gulp.task('test', tslint);

gulp.task('test', function() {
  return tslint({
    tslintOptions: {
      configuration: 'config/tslint.json'
    },
    reporter: "prose"
  });
});
