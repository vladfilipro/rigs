/**
 * This task cleans the css files of duplicated
 * rules and classes.
 *
 * uses the following parameters:
 *     config.src {Array}
 *     config.dest {Array}
 */

'use strict';

var gulp = require( 'gulp' );
var cleanCSS = require( 'gulp-clean-css' );

module.exports = function cleanCssTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        return gulp.src( config.src )
            .pipe( cleanCSS( {
                compatibility: 'ie8'
            } ) )
            .pipe( gulp.dest( config.dest ) );
    } );
};
