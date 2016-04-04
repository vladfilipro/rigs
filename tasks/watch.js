/**
 * This task watches for any changes in the files
 * which requires a task in order to be fully functional
 *
 * uses the following parameters:
 *     config.watchers {Array}
 */

'use strict';

var gulp = require( 'gulp' );

module.exports = function watchTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        for ( var watcher in config.watchers ) {
            if ( config.watchers.hasOwnProperty( watcher ) ) {
                gulp.watch( config.watchers[ watcher ].src, config.watchers[ watcher ].tasks );
            }
        }
    } );
};
