module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            dist: {
                files: {
                    'public/dist/<%= pkg.name %>.min.css': ['public/stylesheets/**/*.css']
                }
            }
        },
        jshint: {
            files: ['**/*.js', '!**/node_modules/**', '!public/**']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/dist/<%= pkg.name %>.min.js': ['public/javascripts/**.js']
                }
            }
        },
        express: {
            dev: {
                options: {
                    node_env: 'development',
                    script: './app.js',
                    background: true
                }
            }
        },
        shell: {
            options: {
                async: true
            },
            mongodb: {
                command: 'mongod --dbpath ./data/db'
            },
            redis: {
                command: 'redis-server'
            }
        },
        watch: {
            dev: {
                files: ['app.js', '**/*.js', '!**/node_modules/**'],
                tasks: ['express:dev'],
                options: {spawn: false}
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 第三方服务器
    grunt.registerTask('server', ['shell:mongodb', 'shell:redis']);

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('dist', ['uglify', 'cssmin']);
    grunt.registerTask('dev', ['express:dev', 'watch:dev']);

    grunt.registerTask('default', ['dev']);
};
