/*eslint-env node*/

var gulp = require('gulp');
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var runSequence = require('run-sequence');

var argv = process.argv;
var isRelease = argv.indexOf('--release') > -1;

gulp.task('build', ['clean'], function(done) {
  runSequence(
    ['tslint', 'sass', 'html', 'fonts', 'images', 'scripts'],
    function() {
      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', done);
    }
  );
});