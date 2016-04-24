# RIGS
[![Dependency Status](https://david-dm.org/vladfilipro/rigs.svg)](https://david-dm.org/vladfilipro/rigs)
- Adds a set of already defined tools for building or running your project
- It uses gulp to run it's tasks
- RIGS uses plugins to add to it's collection, custom build tasks.

## How to use
1. Change directory to the package then install the RIGS package `npm install rigs`
2. Once rigs is installed, choose additional packages you want to install. Packages are usually identified by the prefix `rig-` and you can find the available on npm (or you can create them yourself using [webcase-rig](https://www.npmjs.com/package/webcase))
3. In order to start rigs you need to run: `./node_modules/.bin/rigs` this will copy the required files into your project.
4. Create a file called `rigs.js` into the root of your folder. (or you can have a folder called `rigs` with an `index.js` file inside - the application uses `require('rigs')` to get the configuration)
5. Once the configuration is created use `./node_modules/.bin/gulp my-command` to run your defined command

## Configuration specification
Example of configuration file:

```
'use strict';

module.exports = {
    rigs: [ 'rig-javascript' ],
    commands: {
        'my-command': {
            taskname: 'core__browser-sync',
            dependency: [],
            options: {
                files: [ './**' ],
                watchOptions: {
                    debounceDelay: 1000
                },
                server: {
                    baseDir: './',
                    index: 'index.html'
                },
                port: 8000,
                https: false,
                notify: false,
                ghostMode: false,
                open: false
            }
        },
        'compile': {
            taskname: 'rig-javascript__browserify',
            dependency: [],
            src: './index.js',
            output: 'app.js',
            sourcemap: true,
            dest: './tmp',
            debug: true,
            minify: false
        }
    }
}
```

- the rigs.js file must return an object containing 2 properties: `rigs` (of type ARRAY) and `commands` (of type OBJECT)
- the rigs property in the configuration is an array of strings containing the names of the additional plugins added. In the example given, the application need the rig called "rig-javascript".
- the command property in the configuration is an object.
  - each property has the name of the command defined
  - each value of each property is an object containing:
    - taskname : String
      - represents the name of the task to use to execute the command (check the documentation of each rig installed to see the available tasks)

    - dependency: Array
      - contains an array of strings, each representing a command to execute before executing the current one

  - all other properties are passed on to the task defined in `taskname`. Check each rig's documentation for additional information on the specific task you want to use

## Available tasks in RIGS
By default RIGS offer a set of standard commands. They are available by using them in the `taskname` in the configuration of a command.
- `core__browser-sync`: A task which uses [browser-sync](https://www.npmjs.com/package/browser-sync) to spin up a quick webserver.
  - properties:
    - `options`: browser-sync options object

    ```
    {
        taskname: 'core__browser-sync',
        options: {
            files: [ './**' ],
            watchOptions: {
                debounceDelay: 1000
            },
            server: {
                baseDir: './',
                index: 'index.html'
            },
            port: 8000,
        }
    }
    ```

- `core__clean-css`: A task which uses [clean-css](https://www.npmjs.com/package/clean-css) to clean up your css files
  - properties:
    - `src`: String or Array, refers to the path of input file(s)
    - `dest`: String, refers to the path of the output file(s)

    ```
    {
        taskname: 'core_clean-css',
        src: './ugly.css',
        dest: './'
    }
    ```

- `core__clean`: A task which deletes a folder and it's subfiles and subfolders synchronously
  - properties:
    - `path`: String, refers to the path of the folder

    ```
    {
        taskname: 'core__copy',
        src: [ './src/**/*' ],
        dest: './dest'
    }
    ```

- `core__copy`: A task which copies a set of files to a different path
  - properties:
    - `src`: String or Array, refers to the path of input file(s)
    - `dest`: String, refers to the path of the output file(s)

    ```
    {
        taskname: 'core__copy',
        src: [ './src/**/*' ],
        dest: './dest'
    }
    ```

- `core__watch`: A task which uses `gulp.watch` to observe changes in files and execute commands based on the changes
  - properties:
    - `watchers`: An array of objects containing 2 properties:
      - `src`: an array of strings representing `gulp.src`
      - `tasks`: an array of strings representing your commands

    ```
    {
        taskname: 'core__watch',
        watchers: [ {
            src: [ '/**/*.js' ],
            tasks: [ 'compile' ]
        }]
    }
    ```

## Tricks
You can create your own standard `gulp` tasks to call your configured commands. This is especially useful if used in combination with [run-sequence](https://www.npmjs.com/package/run-sequence) to control the way your commands are being executed
