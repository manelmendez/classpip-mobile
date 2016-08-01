var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var runSequence = require('run-sequence');

gulp.task('watch', ['clean'], function(done) {
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function() {
      gulpWatch('app/**/*.scss', function() {
        gulp.start('sass');
      });
      gulpWatch('app/**/*.html', function() {
        gulp.start('html');
      });
      buildBrowserify({
        watch: true
      }).on('end', done);
    }
  );
});
