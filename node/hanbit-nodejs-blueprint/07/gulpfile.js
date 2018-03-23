var gulp = require('gulp'),
// Nodemon은 파일에 변화가 있을 때 애플리케이션을 리로드하는 Node.js 모듈이다.
nodemon = require('gulp-nodemon'),
plumber = require('gulp-plumber'),
// 라이브 리로드는 서버 측 변경을 애플리케이션과 동기화해주는 브라우저 플러그인이다.
livereload = require('gulp-livereload');

gulp.task('develop', function() {
	livereload.listen();
	nodemon({
		script: 'app.js',
		ext: 'js ejs',
		stdout: false
	}).on('readable', function() {
		this.stdout.on('data', function(chunk) {
			if (/^Express server listening on port/.test(chunk)) {
				livereload.changed(__dirname);
			}
		});
		this.stdout.pipe(process.stdout);
		this.stderr.pipe(process.stderr);
	});
});

// 모든 걸프 태스크는 이름을 붙일 수 있다.
// 기본 태스크를 호출하기 위해 develop라는 별칭을 주었다.
// 대규모 어플리케이션은 별칭이 없는 태스크가 많이 있을 수 있다.
gulp.task('default', [
	'develop'
]);
