#!/usr/bin/env node

'use strict';

var TEMPLATE_DIR = __dirname + '/template';
var DEST_DIR = './';

var fs = require( 'fs' );

var copyDir = require( 'copy-dir' );

copyDir( TEMPLATE_DIR, DEST_DIR, function( _stat, _path ) {
    if ( _stat === 'file' ) {
        console.log( 'copying file ', _path );
    }
    return true;
}, function() {
    console.log( 'Files copied.' );
    console.log( 'Renaming copied files.' );
    var pattern = new RegExp( '^_', 'gi' );
    fs.readdirSync( DEST_DIR ).forEach( function( file ) {
        try {
            if ( pattern.test( file ) ) {
                fs.renameSync( DEST_DIR + '/' + file, DEST_DIR + '/' + file.replace( pattern, '.' ) );
                console.log( 'Renaming ' + file + ' to ' + file.replace( pattern, '.' ) );
            }
        } catch ( e ) {
            console.log( 'Error renaming file ', file, ' ; ', e );
        }
    } );
} );
