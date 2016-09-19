/*eslint-env node*/

var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var runSequence = require('run-sequence');

gulp.task('watch', ['clean'], function(done) {
  runSequence(
    ['tslint', 'sass', 'html', 'fonts', 'images', 'scripts'],
    function() {
      gulpWatch(['app/**/*.scss', 'node_modules/classpip-theming/**/*.scss', ], function() {
        gulp.start('sass');
      });
      gulpWatch(['node_modules/classpip-theming/fonts/*'], function() {
        gulp.start('fonts');
      });
      gulpWatch(['node_modules/classpip-theming/images/*', 'app/images/*'], function() {
        gulp.start('images');
      });
      gulpWatch('app/**/*.html', function() {
        gulp.start('html');
      });
      // watch the linked repository for copying the files on change
      gulpWatch('../classpip-utils/dist/index.js', function(file) {
        gulp.start('linked');
      });
      buildBrowserify({
        watch: true
      }).on('end', done);
    }
  );
});