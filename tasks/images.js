/*eslint-env node*/

var gulp = require('gulp');

gulp.task('images', ['theme-images', 'app-images'])

gulp.task('theme-images', function(options) {
    options.src = options.src || 'node_modules/classpip-theming/images/**/*.+(svg|png|jpg|gif|jpeg)';
    options.dest = options.dest || 'www/build/images';

    return gulp.src(options.src)
        .pipe(gulp.dest(options.dest));
});

gulp.task('app-images', function(options) {
    options.src = options.src || 'app/images/*.+(svg|png|jpg|gif|jpeg)';
    options.dest = options.dest || 'www/images/';

    return gulp.src(options.src)
        .pipe(gulp.dest(options.dest));
});