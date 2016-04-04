'use strict';

var rigsFolder = './..';

var requireFile = function( path ) {
    try {
        return require( path );
    } catch ( e ) {
        console.log( e );
        return false;
    }
};

var loadConfiguration = function( path ) {
    var config = requireFile( path + '/tasks.js' );

    for ( var configName in config ) {
        if ( config.hasOwnProperty( configName ) ) {
            if ( config[ configName ].taskname ) {
                config[ configName ].dependencies = config[ configName ].dependencies || [];
                requireFile( path + '/tasks/' + config[ configName ].taskname )( configName, config[ configName ] );
            } else {
                console.log( 'No taskname specified for configuration ', configName, ' with config ', config[ configName ] );
            }
        }
    }
};

// Load configuration
loadConfiguration( rigsFolder );
