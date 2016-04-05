'use strict';

var rigs = [];

var getTask = function( name ) {
    var tasks = {};
    for ( var i = 0; i < rigs.length; i++ ) {
        tasks = rigs[ i ].tasks;
        for ( var taskname in tasks ) {
            if ( tasks.hasOwnProperty( taskname ) ) {
                if ( rigs[ i ].name + '__' + taskname === name ) {
                    return tasks[ taskname ];
                }
            }
        }
    }
    return false;
};

var loadConfiguration = function( config ) {
    var task = false;
    for ( var command in config ) {
        if ( config.hasOwnProperty( command ) ) {
            if ( config[ command ].taskname ) {
                config[ command ].dependencies = config[ command ].dependencies || [];
                task = getTask( config[ command ].taskname );
                if ( typeof task === 'function' ) {
                    task.call( this, command, config[ command ] );
                }
            } else {
                console.log( 'No taskname specified for configuration ', command, ' with config ', config[ command ] );
            }
        }
    }
};

module.exports = {
    addRig: function( rig ) {
        rigs.push( rig );
    },
    init: function( config ) {
        loadConfiguration( config );
    }
};
