var gulp = require('gulp');
var mocha = require('gulp-mocha');

// REFERENCES
//
// About browserify
// http://tttttahiti.hatenablog.com/entry/2015/08/18/185325
// https://www.npmjs.com/package/vinyl-source-stream

gulp.task('test', function(){
    gulp.src('tests/*.js', {read: false})
    .pipe(mocha())
})


gulp.task('default', [
    'test',
]);
