module.exports = function(grunt) {
  grunt.initConfig({
    pgk: grunt.file.readJSON('package.json'),
    nodeunit: {
      all: ['tests/*.js']
    },
    preprocess: {
      dist: {
        files: {
          'views/chat.ejs': 'views/chat.pre',
          'views/layout.ejs': 'views/layout.pre',
          'js_src/src/chat.js': 'js_src/src/chat.pre.js'
        }
      }
    },
    clean: {
      dist: {
        src: ['static/js/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // 기본 태스크
  grunt.registerTask('default', ['nodeunit', 'preprocess', 'clean']);
  grunt.registerTask('prep', ['nodeunit', 'preprocess']);
}
