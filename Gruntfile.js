module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        express: {
            options: {
                script: './app.js'
            },
            dev: {
                options: {
                    node_env: 'development',
                    port: 3000,
                    background: true
                }
            },
            prod: {
                options: {
                    node_env: 'production',
                    port: 80,
                    background: true
                }
            }
        },
        shell: {
            mongodb: {
                command: 'mongod --dbpath ./data/db',
                options: {
                    async: true,
                    stdout: false,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        cwd: '.'
                    }
                }
            },
            redis:{
                command: 'redis-server',
                options:{
                    async: true,
                    spawn: false
                }
            }
        },
        watch: {
            dev: {
                files: ['app.js', '**/*.js', '!**/node_modules/**'],
                tasks: ['express:dev'],
                options: { spawn: false }
            },
            prod: {
                files: ['app.js', '**/*.js', '!**/node_modules/**'],
                tasks: ['express:prod'],
                options: { spawn: false }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell-spawn');

    grunt.registerTask('dev', ['express:dev', 'watch:dev']);
    grunt.registerTask('dist', ['express:prod', 'watch:prod']);

    grunt.registerTask('server', ['shell:mongodb', 'shell:redis']);
    grunt.registerTask('default', ['dev']);
};
