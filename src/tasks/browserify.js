/**
 * This task compiles all javascript files
 * into one, and handles requires functions
 *
 * uses the following parameters:
 *     config.source {String}
 *     config.dest {String}
 *     config.debug {Boolean}
 *     config.minify {Boolean}
 *     config.transform {Array}
 */

'use strict';

var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var uglify = require( 'gulp-uglify' );

module.exports = function browserifyTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {

        var browserifyTask = browserify( {
            entries: config.src,
            insertGlobals: true,
            debug: config.debug
        } );

        if ( config.transform ) {
            for ( var tid = 0; tid < config.transform.length; tid++ ) {
                browserifyTask.transform( config.transform[ tid ], {
                    global: true
                } );
            }
        }

        browserifyTask = browserifyTask.bundle()
            .pipe( source( config.output ) )
            .pipe( buffer() );

        if ( config.sourcemap ) {
            browserifyTask = browserifyTask.pipe( sourcemaps.init( {
                loadMaps: true
            } ) );
        }

        if ( config.minify ) {
            browserifyTask = browserifyTask.pipe( uglify() );
        }

        browserifyTask.on( 'error', function handleError( error ) {
            console.log( error );
        } );

        if ( config.sourcemap ) {
            browserifyTask = browserifyTask.pipe( sourcemaps.write( './' ) );
        }

        return browserifyTask
            .pipe( gulp.dest( config.dest ) );

    } );
};
