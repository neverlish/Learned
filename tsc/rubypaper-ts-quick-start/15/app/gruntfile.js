// 15-6-2 그런트 설치와 태스크 패키지 설치

module.exports = function(grunt) {
  'use strict';

  var webpack = require('webpack');
  require('time-grunt')(grunt);
  var path = require('path');

  grunt.initConfig({
    // 15-6-3 그런트 설정 파일에 웹팩 작업을 등록
    webpack: {
      compile_client: {
        devtool: 'source-map',
        entry: ['./client/js'],
        output: {
          path: path.resolve(__dirname, 'dist/client/js'),
          filename: 'app.js'
        },
        module: {
          loaders: [{
            test: /\.tsx?/,
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }]
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ],
        resolve: {
          extensions: ['.ts', '.js']
        }
      }
    },
    // 15-6-4 그런트 설정 파일에 타입스크립트 컴파일 작업 등록
    ts: {
      compile_server: {
        files: [{
          src: ['server/**/*.ts', '!server/.baseDir.ts'],
          dest: './dist'
        }],
        options: {
          module: 'commonjs',
          target: 'es6',
          sourceMap: false,
          options: {
            callback: function(ts) {
              // 콜백 작업
            }
          }
        }
      }
    },
    // 15-6-5 그런트 설정 파일에 파일 복사 작업 등록
    copy: {
      client_static: {
        files: [{
          expand: true,
          cwd: './client',
          src: ['**', '!**/js/**'],
          dest: './dist/client'
        }]
      },
      server_template: {
        files: [{
          expand: true,
          cwd: './server/views',
          src: ['**'],
          dest: './dist/server/views'
        }]
      }
    },
    // 15-6-6 그런트 설정 파일에 동시성 설정
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch', 'browserSync'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--inspect'],
          env: { PORT: '8080' },
          delay: 1000,
          ignore: ['node_modules/**'],
          ext: 'js, ejs',
          callback: function(nodemon) {
            nodemon.on('log', function(event) {
              console.log('nodemon log : ' + event.colour);
            });
            nodemon.on('config:update', function() {
              require('open')('http://localhost:8080');
            });
            nodemon.on('restart', function() {
              console.log('nodemon restart');
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          },
        }
      }
    },
    // 15-6-7 그런트 설정 파일에 감시 작업 등록
    watch: {
      client_webpack: {
        files: ['client/js/**/*.ts'],
        tasks: ['webpack']
      },
      client_static: {
        files: ['client/**', '!client/js/**'],
        tasks: ['copy:client_static']
      },
      server_ts: {
        files: ['server/**/*.ts', 'common/**/*.ts', '!client/js/**/*.ts'],
        tasks: ['ts']
      },
      server_template: {
        files: ['**/*.ejs', '!dist/**/*.ejs'],
        tasks: ['copy:server_template']
      }
    },
    browserSync: {
      files: ['.rebooted']
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', [
    'webpack',
    'ts',
    'copy',
    'concurrent'
  ]);
};
