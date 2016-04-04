'use strict';

var rigs = require( 'rigs' );
var config = require( './rigs' );

if ( config.rigs ) {
    for ( var i = 0; i < config.rigs.length; i++ ) {
        rigs.addRig( require( config.rigs[ i ] ) );
    }
}

rigs.init( config.commands );
