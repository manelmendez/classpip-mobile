/*eslint-env node*/

// Overritten task from https://github.com/driftyco/ionic-gulp-tasks

var gulp = require('gulp');
var sassBuild = require('ionic-gulp-sass-build');

gulp.task('sass', function() {
  return sassBuild({
    sassOptions: {
      includePaths: [
        'node_modules/ionic-angular',
        'node_modules/ionicons/dist/scss',
        'node_modules/classpip-theming'
      ]
    }
  });
});