module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        browserify: {
            vendor: {
                src: [],
                dest: 'build/assets/js/vendor.js',
                options: {
                    alias: {
                        jqueryWrapper: './assets/js/jquery-1.12.4.js',
                        jqueryMigrateWrapper: './assets/js/jquery-1.4.1-migrate.min.js',
                        jqueryFormWrapper: './assets/js/jquery.form.min.js',
                        analyticsWrapper: './assets/js/analytics.js',
                        commentReplyWrapper: './assets/js/comment-reply.min.js',
                        themeWrapper: './assets/js/tagdiv_theme.min.js',
                        wpEmbedWrapper: './assets/js/wp-embed.min.js',
                        wpEmojiWrapper: './assets/js/wp-emoji-release.min.js',
                        scriptsWrapper: './assets/js/scripts.js'
                    }
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/assets/css',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    { expand: true, flatten: true, src: ['assets/icons/*'], dest: 'build/assets/icons/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['assets/sprites/*'], dest: 'build/assets/sprites/', filter: 'isFile' },
                    { flatten: true, src: ['home.html'], dest: 'build/home.html', filter: 'isFile' }
                ],
            },
        },

        image: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/imgs',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'build/assets/imgs/'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeEmptyAttributes: true
                },
                files: {
                    'build/home.html': 'home.html'
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'build/assets/js/main.min.js': ['build/assets/js/vendor.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['browserify', 'image', 'cssmin', 'uglify', 'copy', 'htmlmin']);

};