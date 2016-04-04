/**
 * This task recursively remove the content
 * of a given folder from the file system.
 *
 * uses the following parameters:
 *     config.path {String}
 */

'use strict';

var gulp = require( 'gulp' );
var fs = require( 'fs' );

module.exports = function cleanTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {

        var deleteRecursive = function( path ) {
            if ( fs.lstatSync( path ).isDirectory() ) {
                fs.readdirSync( path ).forEach( function( file ) {
                    deleteRecursive( path + '/' + file );
                } );
                fs.rmdirSync( path );
            } else {
                fs.unlinkSync( path );
            }
        };

        try {
            deleteRecursive( config.path );
        } catch ( e ) {
            console.warn( 'Cannot delete ', config.path );
        }

    } );
};
