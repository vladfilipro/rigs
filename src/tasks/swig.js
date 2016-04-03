/**
 * This task uses swig to render templates at design time
 *
 * uses the following parameters:
 *     config.src {Array}
 *     config.config {Object}
 *     config.configFile {String}
 *     config.outputExt {String}
 *     config.dest {String}
 */

'use strict';

var gulp = require( 'gulp' );
var swig = require( 'gulp-swig' );
var data = require( 'gulp-data' );
var rename = require( 'gulp-rename' );
var fs = require( 'fs' );

module.exports = function swigTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        return gulp.src( config.src )
            .pipe( data( function() {
                if ( config.configFile ) {
                    return JSON.parse( fs.readFileSync( config.configFile ) );
                }
                if ( config.config ) {
                    return config.config;
                }
            } ) )
            .pipe( swig() )
            .pipe( rename( {
                extname: config.outputExt
            } ) )
            .pipe( gulp.dest( config.dest ) );
    } );
};
