'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    copy: {
      dist: {
        src: 'src/angular-fontawesome.js',
        dest: 'dist/angular-fontawesome.js'
      }
    },
    connect: {
      demo: {
        options: {
          port: 8005,
          hostname: '*',
          open: 'http://localhost:8005/demo'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/angular-fontawesome.min.js': ['dist/angular-fontawesome.js']
        }
      }
    },
    clean: {
      dist: {
        src: ['dist/*']
      }
    },
    karma: {
      all: {
        configFile: 'karma.conf.js',
        options: {
          browsers: ['Chrome', 'Safari', 'Firefox']
        }
      },
      phantomjs: {
        configFile: 'karma.conf.js',
        options: {
          browsers: ['PhantomJS']
        }
      }
    },
    eslint: {
      main: ['Gruntfile.js', 'test/**/*.js', 'src/**/*.js', 'demo/**/*.js']
    },
    'gh-pages': {
      demo: {
        options: {
          base: '.'
        },
        src: ['src/**/*', 'dist/**/*', 'demo/**/*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['clean:dist', 'copy:dist', 'uglify:dist']);
  grunt.registerTask('test-suite', ['eslint', 'karma:all']);
  grunt.registerTask('test', ['eslint', 'karma:phantomjs']);
  grunt.registerTask('release', ['test-suite', 'build', 'bump', 'gh-pages']);
};
