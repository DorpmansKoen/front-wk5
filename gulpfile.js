// Referenties leggen naar de tools (die ge�nstall  eerd zijn)
let gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    csslint = require("gulp-csslint"),
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    concat = require("gulp-concat");

const PATHS = {
    HTML: {
        SCR : './src/*.html',
        DIST: './dist/'
    },
    JS: {
        SCR: './src/**/*.js',
        DIST: './dist/js'
    },
    CSS: {
        SCR: './src/**/*.css',
        DIST: './dist/css'
    }
};

gulp.task("default", function(){
    let htmlWatcher = gulp.watch(PATHS.HTML.SCR, ["copy-html"]);
    htmlWatcher.on('change', function(event){
        console.log("File " + event + " was " + event.type)
    });

    gulp.watch(PATHS.CSS.SCR, ['css']);
    gulp.watch(PATHS.JS.SCR, ['js']);
})

gulp.task("copy-html", function () {
    gulp.src(PATHS.HTML.SCR)
        .pipe(gulp.dest(PATHS.HTML.DIST))
});

gulp.task("css", function () {
    gulp.src(PATHS.CSS.SCR)
        .pipe(concat("app.css"))
        .pipe(gulp.dest(PATHS.CSS.DIST))
});

gulp.task("js", function () {
    gulp.src(PATHS.JS.SCR)
        .pipe(concat("app.js"))
        .pipe(gulp.dest(PATHS.JS.DIST))
});