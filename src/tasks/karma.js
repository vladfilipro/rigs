/**
 * This task loads configuration for, and starts karma
 *
 * uses the following parameters:
 *     config.karma {Object}
 */

'use strict';

var gulp = require( 'gulp' );
var KarmaServer = require( 'karma' ).Server;

module.exports = function karmaFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        var server = new KarmaServer( config.karma, function( exitCode ) {
            console.log( 'Karma has exited with ' + exitCode );
            process.exit( exitCode );
        } );
        return server.start();
    } );
};
