/*eslint-env node*/

var gulp = require('gulp');

gulp.task('images', function(options) {

    options.src = options.src || ['app/images/**/*', 'node_modules/classpip-theming/images/**/*'];
    options.dest = options.dest || 'www/build/images';

    return gulp.src(options.src)
        .pipe(gulp.dest(options.dest));
});