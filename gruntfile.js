module.exports = function(grunt) {

    grunt.initConfig({
        // Grab multiple files
        'curl-dir': {
            customFilepaths: {
                src: [
                    'https://raw.github.com/linnovate/mean/master/app/{controllers,routes}/articles.js',
                    'https://raw.github.com/linnovate/mean/master/app/models/article.js',
                    'https://raw.github.com/linnovate/mean/master/public/views/articles/{create,edit,list,view}.html',
                    'https://raw.github.com/linnovate/mean/master/public/js/{controllers,services}/articles.js'
                ],
                router: function(url) {
                    return url.replace('https://raw.github.com/linnovate/mean/master/app/', 'app_')
                        .replace('https://raw.github.com/linnovate/mean/master/public/views/', 'public_views_')
                        .replace('https://raw.github.com/linnovate/mean/master/public/js/', 'public_js_')
                        .replace(/articles\/(.+)\.html/, '$1.html')
                        .replace('s/article.js', '.js')
                        .replace('s/articles.js', '.js')
                        .replace('public_js_service.js', 'public_js_services.js')
                        .replace('public_js_controller.js', 'public_js_controllers.js');
                },
                dest: 'entity/templates'
            }
        },
        'string-replace': {
            inline: {
                files: {
                    'entity/templates/': 'entity/templates/*',
                    'README.md': 'README.md'
                },
                options: {
                    replacements: [{
                        pattern: /an Article/g,
                        replacement: 'an <%= entityName ENDTAG'
                    }, {
                        pattern: /an article/g,
                        replacement: 'an <%= slugName ENDTAG'
                    }, {
                        pattern: /Article/g,
                        replacement: '<%= entityName ENDTAG'
                    }, {
                        pattern: /article/g,
                        replacement: '<%= slugName ENDTAG'
                    }, {
                        pattern: /ENDTAG/g,
                        replacement: '%>'
                    }, {
                        pattern: /MEAN project looked like at [\d]{4}-[\d]{2}-[\d]{2}/g,
                        replacement: 'MEAN project looked like at <%= grunt.template.today("yyyy-mm-dd") %>'
                    }]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-curl');

    grunt.registerTask('default', ['curl-dir', 'string-replace']);
};