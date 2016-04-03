/**
 * This task spins up a http server on a given
 * port and starts serving files from a specified folder.
 *
 * uses the following parameters:
 *     config.root
 *     config.port
 *     config.defaultIndex
 */

'use strict';

var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' );

module.exports = function browserSyncTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        browserSync( config.options );
    } );
};
