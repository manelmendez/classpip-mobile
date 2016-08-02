/*eslint-env node*/

/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
var gulp = require('gulp');

var argv = process.argv;
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;

gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);
