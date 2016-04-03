/**
 * This task uses jshit to lint the javascript code described
 * in the configuraiton
 *
 * uses the following parameters:
 *     config.src {Array}
 */

'use strict';

var gulp = require( 'gulp' );
var jshint = require( 'gulp-jshint' );

module.exports = function jshintTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        return gulp.src( config.src )
            .pipe( jshint() )
            .pipe( jshint.reporter( 'default' ) )
            .pipe( jshint.reporter( 'fail' ) );
    } );
};
