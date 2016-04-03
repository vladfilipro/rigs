'use strict';

var gulpFolder = '.';

var getFile = function( path, required ) {
    try {
        if ( required ) {
            return require( path );
        } else {
            return path;
        }
    } catch ( e ) {
        console.log( e );
        return false;
    }
};

var loadConfiguration = function( path ) {
    var config = getFile( path + '/tasks.js', true );
    var file;
    for ( var configName in config ) {
        if ( config.hasOwnProperty( configName ) ) {
            file = getFile( path + '/tasks/' + config[ configName ].taskname );
            if ( file ) {
                config[ configName ].dependencies = config[ configName ].dependencies || [];
                require( file )( configName, config[ configName ] );
            }
        }
    }
};

// Load configuration
loadConfiguration( gulpFolder );

// Load commandTask
var defaultCommands = getFile( gulpFolder + '/commands.js', true );
if ( defaultCommands ) {
    defaultCommands();
}
