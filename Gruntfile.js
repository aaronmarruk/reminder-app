module.exports = function (grunt) {
	'use strict';

	var options = {
		pkg: require('./package'), // <%=pkg.name%>

		/**
		 * Grunt global vars
		 * Many of the Grunt tasks use these vars
		 */
		config : {
			src : '_grunt-configs/*.js',

			css : {
				distDir : 'app/client/stylesheets',     // <%=config.css.distDir%>
				srcFile : 'kickoff', // <%=config.css.srcFile%>
				scssDir : 'scss'     // <%=config.css.scssDir%>
			},

			js : {
				distDir  : 'js/dist/',   // <%=config.js.distDir%>
				distFile : 'app.min.js', // <%=config.js.distFile%>
				
				// <%=config.js.fileList%>
				fileList : [
					'js/helpers/console.js',
					'js/script.js'
				]
			},

			img : {
				dir : 'img' // <%=config.img.dir%>
			},

			localserver: 'kickoff.dev', // <%=config.localserver%>

			testing: {
				visual : {
					sizes: [ '600', '1000', '1200' ], // <%=config.testing.visual.sizes%>

					// <%=config.testing.visual.urls%>
					urls : [
						'http://localhost:3000',
						'http://localhost:3000/_docs/',
						'http://localhost:3000/_docs/styleguide.html'
					]
				}
			}
		},
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/* ==========================================================================
		Available tasks:
		* grunt            : run jshint, uglify and sass:kickoff
		* grunt watch      : run sass:kickoff, uglify and livereload
		* grunt dev        : run jshint, uglify and sass:kickoff
		* grunt deploy     : run jshint, uglify, sass:kickoff and csso
		* grunt serve      : watch js & scss and run a local server
		* grunt start      : run this before starting development
		* grunt icons      : generate the icons. uses svgmin and grunticon
		* grunt checks     : run jshint
		* grunt styleguide : watch js & scss, run a local server for editing the styleguide
		 ========================================================================== */

	/**
	 * GRUNT * Default task
	 * run jshint, uglify and sass:kickoff
	 */
	// Default task
	grunt.registerTask('default', [

		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff'
		
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run jshint, uglify and sass:kickoff
	 */
	grunt.registerTask('dev', [
		
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff'
		
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	grunt.registerTask('deploy', [
		
		'dofilesexist:js',
		'uglify',
		
		'sass:kickoff',
		'autoprefixer:kickoff',
		'csso'
		
	]);


	/**
	 * GRUNT SERVE * A task for for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask("serve", [
		
		'dofilesexist:js',
		'uglify',
		
		'sass:kickoff',
		'autoprefixer:kickoff',
		
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT START * Run this to
	 * run jquery builder, uglify, sass and autoprefixer
	 */
	grunt.registerTask('start', [
		
		'dofilesexist:js',
		'uglify',
		
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:kickoff',
		'autoprefixer:styleguide',
		
		'connect:start',
		'watch'
	]);


	/**
	 * GRUNT STYLEGUIDE * A task for the styleguide
	 * run uglify, sass:kickoff, sass:styleguide, autoprefixer:kickoff, autoprefixer:styleguide, connect:styleguide & watch
	 */
	grunt.registerTask('styleguide', [
		
		'dofilesexist:js',
		
		'uglify',
		
		'sass:styleguide',
		'autoprefixer:styleguide',
		
		'connect:styleguide',
		'watch'
	]);


	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 * run clean, svgmin and grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'svgmin',
		'grunticon'
	]);


	/**
	 * GRUNT CHECKS * Check code for errors
	 * run jshint
	 */
	grunt.registerTask('checks', [
		'jshint:project',
		'scsslint'
	]);

	/**
	 * GRUNT DOFILESEXIST * Check for the existence of specific files and fail if not found
	 */
	grunt.registerMultiTask('dofilesexist', function () {

		var filePaths = this.data;
		var numFailedFiles = 0;

		if (Array.isArray(filePaths)) {

			filePaths.forEach(function(path) {

				if (!grunt.file.exists(path))
				{
					grunt.log.warn("Source file: '" + path + "' not found.");
					numFailedFiles++;
				}
			});

			if (numFailedFiles > 0) grunt.fail.warn("Please add the missing files.");
		}
	});



};
