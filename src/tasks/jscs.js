/**
 * This task uses jscs to check if the coding standards are matched
 *
 * uses the following parameters:
 *     config.src {Array}
 */

'use strict';

var gulp = require( 'gulp' );
var jscs = require( 'gulp-jscs' );

module.exports = function jscsTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        return gulp.src( config.src )
            .pipe( jscs() );
    } );
};
