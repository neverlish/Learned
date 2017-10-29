// 프로젝트 디렉토리에서 grunt 실행

module.exports = function(grunt) {
	// 플러그인 로딩
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
		'grunt-contrib-less',
		'grunt-contrib-uglify',
		'grunt-contrib-cssmin',
		'grunt-hashres',
		'grunt-lint-pattern',
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
					'public/css/cart.css': 'less/cart.less',
				}
			}
		},
		uglify: {
			all: {
				files: {
					'public/js/meadowlark.min.js': ['public/js/**/*.js']
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/css/meadowlark.css': ['public/css/**/*.css', '!public/css/meadowlark*.css']
				}
			},
			minify: {
				src: 'public/css/meadowlark.css',
				dest: 'public/css/meadowlark.min.css',
			}
		},
		hashres: {
			options: {
				fileNameFormat: '${name}.${hash}.${ext}'
			},
			all: {
				src: [
					'public/js/meadowlark.min.js',
					'public/css/meadowlark.min.css',
				],
				dest: [
					'config.js',
				]
			},
		},
		link_pattern: {
			view_statics: {
				options: {
					rules: [
						{
							pattern: /<link [^>]*href=]"'(?!\{\}static )/,
							message: 'Un-mapped static resouce found in <link>.',
						},
						{
							pattern: /<script [^>]*src=["'](?!\{\}static )/,
							message: 'Un-mapped static resouce found in <script>.',
						},
						{
							pattern: /<img [^>]*src=["'](?!\{\}static )/,
							message: 'Un-mapped static resouce found in <img>',
						}
					]
				},
				files: {
					src: [
						'views/**/*.handlebars'
					]
				}
			},
			css_statics: {
				options: {
					rules: [
						{
							pattern: /url\(/,
							message: 'Un-mapped static found in LESS property',
						}
					]
				},
				files: {
					src: [
						'less/**/*.less'
					]
				}
			}
		}
	});

	// 작업 등록
	grunt.registerTask('default', ['cafemocha', 'jshint', 'exec','lint_pattern']);
	// grunt static
	grunt.registerTask('static', ['less', 'cssmin', 'uglify', 'hashres']);
}
