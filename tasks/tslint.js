/*eslint-env node*/

var gulp = require('gulp');
var tslint = require('ionic-gulp-tslint');

gulp.task('tslint', tslint);

gulp.task('tslint', function() {
  return tslint({
    tslintOptions: {
      configuration: 'config/tslint.json'
    },
    reporter: "prose"
  });
});
