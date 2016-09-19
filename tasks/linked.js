/*eslint-env node*/

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var fs = require('fs');

gulp.task('linked', function() {
    try {
        // Check if the linked repository exists (if exists we)
        // are on development
        var stats = fs.statSync('../classpip-utils/package.json');
        runSequence(
            'clean',
            'copy-package',
            'copy-dist');
    } catch (err) {
        console.log('Skipping the synced linked directories');
    }
})

gulp.task('clean', function() {
    del('./node_modules/classpip-utils');
});

gulp.task('copy-package', function() {
    gulp.src(['../classpip-utils/package.json'])
        .pipe(gulp.dest('./node_modules/classpip-utils'));
});

gulp.task('copy-dist', function() {
    gulp.src(['../classpip-utils/dist/**'])
        .pipe(gulp.dest('./node_modules/classpip-utils/dist'));
});