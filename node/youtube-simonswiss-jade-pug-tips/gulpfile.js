var gulp = require('gulp');
var jade = require('gulp-jade');

// command 'gulp jade'
gulp.task('jade', function() {
  gulp.src('./src/*.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'))
})
