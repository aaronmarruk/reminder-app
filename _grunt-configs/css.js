module.exports.tasks = {

	/**
	 * Sass compilation using grunt-sass
	 * https://github.com/sindresorhus/grunt-sass
	 * Includes <%=config.css.distDir%>.scss and <%=config.css.distDir%>-old-ie.scss by default
	 */
	sass: {
		kickoff: {
			options: {
				outputStyle: 'nested',
				precision : 10,
				sourceMap : true
			},
			files: {
				'<%=config.css.distDir%>/temp/reminders-app.css' : '<%=config.css.scssDir%>/<%=config.css.srcFile%>.scss',
				'<%=config.css.distDir%>/temp/reminders-app-old-ie.css': '<%=config.css.scssDir%>/<%=config.css.srcFile%>-old-ie.scss'
			}
		},
		styleguide: {
			options: {
				outputStyle: 'compressed',
				precision : 10,
			},
			files: {
				'<%=config.css.distDir%>/styleguide.css': '<%=config.css.scssDir%>/styleguide.scss'
			}
		}
	},


	/**
	 * Autoprefixer
	 * https://github.com/nDmitry/grunt-autoprefixer
	 * https://github.com/ai/autoprefixer
	 * Auto prefixes your CSS using caniuse data
	 */
	autoprefixer: {
		options: {
			// We are supporting the last 2 browsers, any browsers with >1% market share,
			// and ensuring we support IE8+ with prefixes
			browsers: ['> 5%', 'last 4 versions', 'firefox > 3.6', 'ie > 7'],
			map: true
		},

		kickoff: {
			expand: true,
			flatten: true,
			src: '<%=config.css.distDir%>/temp/*.css',
			dest: '<%=config.css.distDir%>/'
		},

		styleguide : {
			src: '<%=config.css.distDir%>/styleguide.css',
			dest: '<%=config.css.distDir%>/styleguide.css'
		}
	},


	/**
	 * CSSO
	 * https://github.com/t32k/grunt-csso
	 * Minify CSS files with CSSO
	 */
	csso: {
		dist: {
			options: {
				restructure: false //turns structural optimisations off as can mess up fallbacks http://bem.info/tools/optimizers/csso/description/
			},
			files: {
				'<%=config.css.distDir%>/reminders-app.css' : '<%=config.css.distDir%>/reminders-app.css',
				'<%=config.css.distDir%>/reminders-app-old-ie.css': '<%=config.css.distDir%>/reminders-app-old-ie.css'
			},
		}
	}
};
