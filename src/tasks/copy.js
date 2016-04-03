/**
 * This task copies files from the source defined
 * in the configuration to the destination defined
 * in the configuration
 *
 * uses the following parameters:
 *     config.src {Array}
 *     config.dest {Array}
 */

'use strict';

var gulp = require( 'gulp' );

module.exports = function copyTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        return gulp.src( config.src )
            .pipe( gulp.dest( config.dest ) );
    } );
};
