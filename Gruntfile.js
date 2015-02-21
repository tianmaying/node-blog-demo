module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'public/dist/<%= pkg.name %>.min.css': ['public/stylesheets/**/*.css']
                }
            }
        },
        jshint: {
            files: ['**/*.js', 'public/javascripts/**/*.js', '!**/node_modules/**', '!public/**']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/javascripts/**'],
                dest: 'public/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 第三方服务器
    grunt.registerTask('server', ['shell:mongodb', 'shell:redis']);

    grunt.registerTask('dist', ['jshint', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('dev', ['express:dev', 'watch:dev']);

    grunt.registerTask('default', ['dev']);
};
