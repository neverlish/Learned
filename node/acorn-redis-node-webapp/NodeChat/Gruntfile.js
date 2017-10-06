module.exports = function(grunt) {
  grunt.initConfig({
    pgk: grunt.file.readJSON('package.json')
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // 기본 태스크
  grunt.registerTask('default', []);
  grunt.registerTask('prep', []);
}
