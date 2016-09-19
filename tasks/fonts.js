/*eslint-env node*/

// Overritten task from https://github.com/driftyco/ionic-gulp-tasks

var gulp = require('gulp');
var copyFonts = require('ionic-gulp-fonts-copy');

gulp.task('fonts', function() {
    return copyFonts({
        src: ['node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)',
            'node_modules/classpip-theming/fonts/**/*.+(ttf|woff|woff2)'
        ]
    });
});