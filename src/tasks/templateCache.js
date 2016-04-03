/**
 * This task compiles views presented in src
 * into angular template cache
 *
 * uses the following parameters:
 *     config.src {Array}
 *     config.dest {Array}
 *     config.options {Object}
 */

'use strict';

var gulp = require( 'gulp' );
var templateCache = require( 'gulp-angular-templatecache' );

module.exports = function templateCacheTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        return gulp.src( config.src )
            .pipe( templateCache( config.options ) )
            .pipe( gulp.dest( config.dest ) );
    } );
};
