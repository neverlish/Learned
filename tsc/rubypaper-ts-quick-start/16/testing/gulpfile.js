// 16-2-3 걸프를 이용한 테스트 환경 구축 - 테스트 프로젝트에서 사용할 걸프 설정 파일

var gulp = require('gulp');

var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var tsProject = ts.createProject('./tsconfig.json');

gulp.task('compile', function() {
  var stream = gulp.src(['./src/**/*.ts'], { base: './src' })
    .pipe(tsProject())
    .pipe(gulp.dest('./test'));

  return stream;
});

gulp.task('test', function() {
  var stream = gulp.src(['./test/**/*.test.js'], { base: '.' })
    .pipe(mocha({
      reporter: 'spec'
    }));
    
  return stream;
});

gulp.task('sequence', function(done) {
  runSequence('compile', 'test', function() {
    done();
  });
});

gulp.task('default', ['sequence']);
