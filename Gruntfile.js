"use strict";

var path = require('path');

module.exports = function (grunt) {

    grunt.initConfig({
        _staticPath  : 'static',
        pkg: grunt.file.readJSON('package.json'),
        express: {
            dev: {
                options: {
                    port: 3000,
                    hostname: 'localhost',
                    server: path.resolve('./_server/server')
                }
            }
        },
        jasmine: {
            all: {
                src: [
                    'static/scripts/module.js'
                ],
                options: {
                    'specs': 'test/module.spec.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: '**/*.less',
                tasks: ['less']
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "static/css/main.css": "static/less/main.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', 'Start dev server.', ['express', 'watch']);

    grunt.registerTask('test', 'Test.', ['jasmine']);

};