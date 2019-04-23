module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
        js: {
          src: ['../js/main.js'],
          dest: '../dist/app.js'
        },
        options: {
          browserifyOptions: {
            paths: ["./node_modules"]
          }
        }
      },
      eslint: {
         options: {
            configFile: '.eslintrc.json'
         },
         all: ['../js/**/*.js']
      },
      sass: { //setup sass compilation
         dist: {
            files: {
               '../css/styles.css': '../sass/main.scss'
            }
         }
      },
      watch: { //automatically watch for changes
         javascripts: {
            files: ['../js/**/*.js'],
            tasks: ['eslint']
         },
         sass: {
            files: ['../sass/**/*.scss'],
            tasks: ['sass']
         },
         browserify: {
            files: ['../js/**/*.js'],
            tasks: ['browserify']
         }
      }
   });

   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
   grunt.registerTask('default', ['eslint', 'sass', 'browserify', 'watch']);
};
