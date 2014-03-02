"use strict";

var path = require('path');

module.exports = function (grunt) {

    grunt.initConfig({
        _staticPath  : 'static',
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            dev: {
                options: {
                    port: 9001,
                    base: 'www',
                    keepalive: true
                }
            }
        },
        jasmine: {
            all: {
                src: [
                    //'static/js/index.js'
                ],
                options: {
                    specs: 'test/index.spec.js'
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
                    "www/css/main.css": "www/less/main.less",
                    "www/css/normalize.css": "www/less/normalize.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', 'Start dev server.', ['connect']);

};