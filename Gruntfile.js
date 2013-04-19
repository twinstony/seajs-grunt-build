module.exports = function (grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);

    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),

        transport : {
            options : {
                paths : ['.'],
                alias: '<%= pkg.spm.alias %>',
                parsers : {
                    '.js' : [script.jsParser],
                    '.css' : [style.css2jsParser],
                    '.html' : [text.html2jsParser]
                }
            },

            styles : {
                options : {
                    idleading : 'styles/'
                },

                files : [
                    {
                        cwd : 'styles',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/styles'
                    }
                ]
            },

            app1 : {
                options : {
                    idleading : 'app1/'
                },

                files : [
                    {
                        cwd : 'app',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/app'
                    }
                ]
            }
        },
        concat : {
            options : {
                paths : ['.'],
                include : 'relative'
            },
            dialog : {
                files : {
                    'dist/styles/component/dialog/src/dialog.js' : ['.build/styles/component/dialog/src/dialog.js'],
                    'dist/styles/component/dialog/src/dialog-debug.js' : ['.build/styles/component/dialog/src/dialog-debug.js']
                }
            },
            app1 : {
                options : {
                    include : 'all'
                },
                files : {
                    'dist/app/app1/index/src/index.js' : ['.build/app/app1/index/src/index.js'],
                    'dist/app/app1/index/src/index-debug.js' : ['.build/app/app1/index/src/index-debug.js']
                }
            }
        },

        uglify : {
            dialog : {
                files : {
                    'dist/styles/component/dialog/src/dialog.js' : 'dist/styles/component/dialog/src/dialog.js'
                }
            },
            app1 : {
                files : {
                    'dist/app/app1/index/src/index.js' : 'dist/app/app1/index/src/index.js'
                }
            }
        },

        clean : {
            spm : ['.build']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build-styles', ['transport:styles', 'concat:dialog', 'uglify:dialog', 'clean']);
    grunt.registerTask('build-app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
//    grunt.registerTask('default', ['clean']);
};