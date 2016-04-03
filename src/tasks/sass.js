/**
 * This task compiles the sass files defined
 * in the configuration
 *
 * uses the following parameters:
 *     config.src {Array}
 *     config.dest {Array}
 *     config.sourcemap {Boolean}
 *     config.rename {String}
 *     config.minify {Boolean}
 */

'use strict';

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var sourcemaps = require( 'gulp-sourcemaps' );
var rename = require( 'gulp-rename' );

var path = require( 'path' );
var fs = require( 'fs' );

var fileExists = function( file ) {
    try {
        fs.lstatSync( file );
        return true;
    } catch ( e ) {
        try {
            fs.lstatSync( file + '.scss' );
            return true;
        } catch ( e ) {
            return false;
        }
    }
};

// Trying to resolve node_module
var resolveNodeImporter = function( url, file, done ) {
    try {
        var nodeModuleFile = require.resolve( url ).substring( 0, require.resolve( url ).indexOf( url ) + url.length ) + '/dist/styles/main.scss';
        if ( fileExists( nodeModuleFile ) ) {
            done( {
                file: nodeModuleFile
            } );
            return true;
        }
    } catch ( e ) {}
    return false;
};

// Trying to resolve relative path
var resolveRelativeImporter = function( url, file, done ) {
    var filepath = file;
    if ( file === 'stdin' ) {
        filepath = '';
    }
    var filename = path.resolve( path.dirname( filepath ), url );
    if ( fileExists( filename ) ) {
        done( {
            file: filename
        } );
        return true;
    }
    return false;
};

module.exports = function sassTaskFunc( name, config ) {
    gulp.task( name, config.dependency, function() {
        var sassTask = gulp.src( config.src );
        var options = {
            errLogToConsole: true,
            importer: function( url, file, done ) {
                if ( !resolveNodeImporter( url, file, done ) ) {
                    if ( !resolveRelativeImporter( url, file, done ) ) {
                        done( {
                            file: url
                        } );
                    }
                }
            }
        };

        if ( config.sourcemap ) {
            sassTask = sassTask.pipe( sourcemaps.init() );
        }

        if ( config.importer ) {
            options.importer = config.importer;
        }
        if ( config.minify ) {
            options.outputStyle = 'compressed';
        }

        sassTask = sassTask.pipe( sass( options ).on( 'error', sass.logError ) );

        if ( config.sourcemap ) {
            sassTask = sassTask.pipe( sourcemaps.write() );
        }

        if ( config.rename ) {
            sassTask.pipe( rename( {
                extname: config.rename
            } ) );
        } else {
            sassTask.pipe( rename( {
                extname: '.css'
            } ) );
        }

        return sassTask.pipe( gulp.dest( config.dest ) );
    } );
};
