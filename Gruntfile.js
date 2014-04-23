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
			main: {
				configFile: 'karma.conf.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('build', ['clean:dist', 'copy:dist', 'uglify:dist']);
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('release', ['build']);
};