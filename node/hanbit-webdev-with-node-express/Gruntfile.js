// 프로젝트 디렉토리에서 grunt 실행

module.exports = function(grunt) {
	// 플러그인 로딩
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
		'grunt-contrib-less',
	].forEach(function(task) {
		grunt.loadNpmTasks(task);
	});

	// 플러그인 설정
	grunt.initConfig({
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
		},
		jshint: {
			app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'], 
		},
		exec: {
			linkchecker: {cmd: 'linkchecker http://localhost:3000'}
		},
		// grunt less
		less: {
			development: {
				options: {
					customFunctions: {
						static: function(lessObject, name) {
							return 'url("' + require('./lib/static.js').map(name.value) + '")';
						}
					}
				},
				files: {
					'public/css/main.css': 'less/main.less',
				}
			}
		}
	});

	// 작업 등록
	grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
}
