/**
 * jQuery.Utilities
 * 
 */

'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require('graceful-fs');
var plugins = require('gulp-load-plugins')();

var dataBower = JSON.parse(fs.readFileSync('./bower.json', 'utf8'))
var fileNames = {
	sourcesUrl : path.join('./'),
	targetUrl : 'dist',
	styles : 'css',
	scripts : 'src',
};
var sourcesPaths = {
	styles : {
		base : path.join(fileNames.sourcesUrl, fileNames.styles, '**', 'utilities', '**', '*.css'),
		sass : path.join(fileNames.sourcesUrl, fileNames.styles, '**', 'utilities', '**', '*.{sass,scss}')
	},
	scripts : {
		base : path.join(fileNames.sourcesUrl, fileNames.scripts, '**', '*.js')
	}
};
var targetPaths = {
	styles : path.join(fileNames.targetUrl, fileNames.styles),
	scripts : fileNames.targetUrl
}

gulp.task('styles', function() {
	gulp.src([ sourcesPaths.styles.base, sourcesPaths.styles.sass ]).pipe(plugins.sass({
		style : 'compact',
		precision : 8,
		errLogToConsole : true
	})).pipe(plugins.flatten()).pipe(gulp.dest(targetPaths.styles)).pipe(plugins.size({
		title : 'Styles'
	}));

	minifyCss(gulp.src([ sourcesPaths.styles.base, sourcesPaths.styles.sass ]).pipe(plugins.sass({
		style : 'compact',
		precision : 8,
		errLogToConsole : true
	}))).pipe(plugins.flatten()).pipe(gulp.dest(targetPaths.styles)).pipe(plugins.size({
		title : 'Styles Min'
	}));
});

gulp.task('scripts', function() {
	gulp.src(sourcesPaths.scripts.base).pipe(plugins.replace('@VERSION', dataBower.version)).pipe(plugins.jshint({
		/* Visit http://www.jshint.com/docs/options/ to lookup detail */
		/* Enforcing */
		bitwise : false,
		camelcase : true,
		curly : true,
		eqeqeq : false,
		es3 : false,
		forin : false,
		freeze : false,
		immed : true,
		indent : 4,
		latedef : true,
		lookup : false,
		newcap : true,
		noarg : false,
		noempty : true,
		nonbsp : true,
		nonew : true,
		plusplus : false,
		quotmark : true,
		undef : true,
		unused : false,
		strict : false,
		maxparams : 5,
		maxdepth : 5,
		maxstatements : 10,
		maxcomplexity : 5,
		maxlen : 200,
		/* Environments */
		browser : true,
		jquery : true,
		node : true
	})).pipe(plugins.jshint.reporter(require('jshint-stylish'))).pipe(plugins.flatten()).pipe(gulp.dest(targetPaths.scripts)).pipe(plugins.size({
		title : 'Scripts'
	}));

	gulp.src(sourcesPaths.scripts.base).pipe(plugins.replace('@VERSION', dataBower.version)).pipe(plugins.uglify({
		preserveComments : 'all'
	})).pipe(plugins.rename({
		suffix : '.min'
	})).pipe(plugins.flatten()).pipe(gulp.dest(targetPaths.scripts)).pipe(plugins.size({
		title : 'Scripts Min'
	}));

});

gulp.task('clean', function() {
	return gulp.src(path.join(fileNames.targetUrl, '*'), {
		read : false
	}).pipe(plugins.clean({
		force : false
	}));
});

gulp.task('watch', function(next) {
	gulp.watch([ sourcesPaths.styles.base, sourcesPaths.styles.sass ], [ 'styles' ]);
	gulp.watch(sourcesPaths.scripts.base, [ 'scripts' ]);
});

// DEFAULT GULP TASK
gulp.task('default', [ 'clean' ], function() {
	gulp.start([ 'styles', 'scripts' ]);
});

gulp.task('default-test', [ 'clean' ], function() {
	gulp.start([ 'styles', 'scripts', 'watch' ]);
});

function minifyCss(src) {
	return src.pipe(plugins.minifyCss({
		keepSpecialComments : 1,
		processImport : true,
		keepBreaks : false,
		benchmark : true
	})).pipe(plugins.rename({
		suffix : '.min'
	}));
}