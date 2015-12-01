module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        clean: ['dist'],

        copy: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src/public',
                    src: ['**', '!**/stylesheets/**', '!**/app.js'],
                    dest: 'dist/public/'
                }]
            }
        },

        sass: {
            development: {
                options: {
                    style: 'compact'
                },
                files: [{
                    expand: true,
                    cwd: 'src/public/assets/stylesheets',
                    src: ['*.scss'],
                    dest: 'dist/public/assets/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            public: {
                files: ['src/public/**'],
                tasks: ['copy', 'sass:development', 'ngAnnotate']
            }
        },

        nodemon: {
            development: {
                script: 'src/server',
                options: {
                    ignore: ['src/public'],
                    env: {
                        'NODE_ENV': 'development'
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['concurrent:development']);
};