module.exports = function (grunt) {
	grunt.initConfig({
		copy: {
			dist: {
				src: 'src/angular-fontawesome.js',
				dest: 'dist/angular-fontawesome.js'
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/angular-fontawesome.min.js': [ 'dist/angular-fontawesome.js' ]
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
		jshint: {
			main: ["Gruntfile.js", "test/**/*.js", "src/**/*.js"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('build', ['clean:dist', 'copy:dist', 'uglify:dist']);
	grunt.registerTask('test-suite', ['jshint', 'karma:all']);
	grunt.registerTask('test', ['jshint', 'karma:phantomjs']);
	grunt.registerTask('release', ['build']);
};