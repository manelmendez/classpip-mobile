/*eslint-env node*/

// Overritten task from https://github.com/driftyco/ionic-gulp-tasks

var gulp = require('gulp');

gulp.task('fonts', ['fonts-ionic', 'fonts-theme'])

gulp.task('fonts-ionic', function(options) {
    options.src = options.src || 'node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)';
    options.dest = options.dest || 'www/build/fonts';

    return gulp.src(options.src)
        .pipe(gulp.dest(options.dest));
});

gulp.task('fonts-theme', function(options) {
    options.src = options.src || 'node_modules/classpip-theming/fonts/**/*.+(ttf|woff|woff2)';
    options.dest = options.dest || 'www/build/fonts';

    return gulp.src(options.src)
        .pipe(gulp.dest(options.dest));
});