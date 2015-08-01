module.exports = function(grunt) {
   grunt.initConfig({
      watch: {
         all: {
            files: ['**/*.html','**/styles/*.css','**/js/*.js','**/js/*.json','Gruntfile.js'],
            options: { livereload: true }
         },
         sass: {
            files: 'styles/sass/*.sass',
            tasks: ['sass:format','autoprefixer']
         },
         scripts: {
            files: ['scripts/init.js'],
            tasks: ['uglify']
         }     
      },
      sass: {
         format: {
            files: [{
               'styles/main.css':'styles/sass/main.sass'
            }],
            options: {
               lineNumbers: false, // Project line numbers from SASS file
               // style: 'compressed',
               trace: true,
               update: true
            }
         },
         compress: {
            files: {
               'dist/styles/main.min.css':'styles/main.css',
               'dist/styles/bootstrap.min.css':'bower_components/bootstrap/dist/css/bootstrap.min.css'
            },
            options: {
               lineNumbers: false,
               style: 'compressed',
               trace: false
            }
         }
      },
      autoprefixer: {
         options: {
            cascade: false
         },
         sass: {
            src: 'styles/main.css',
            dest: 'styles/main.css'
         }
      },
      uglify: {
         options: {
            mangle: false
         },
         target: {
            files: {
               'dist/scripts/app.min.js':['scripts/init.js'],
               'dist/lib/mithril.min.js':['bower_components/mithril/mithril.min.js']
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks('grunt-autoprefixer');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   
   grunt.registerTask('default', ['watch','sass','autoprefixer']);
   grunt.registerTask('build', ['uglify','sass:compress'])

}