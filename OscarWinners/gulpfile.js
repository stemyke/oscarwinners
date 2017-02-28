
var gulp = require("gulp"),
    del = require("del"),
    sass = require("gulp-sass"),
    karma = require("gulp-karma"),
    jshint = require("gulp-jshint"),
    sourcemaps = require("gulp-sourcemaps"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    ngAnnotate = require("browserify-ngannotate");

var CacheBuster = require("gulp-cachebust");
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// kiüríti a dist mappát
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("clean", function (cb) {
    del(["dist"], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// lefordítja a sass fájlokat
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("build-css", ["clean"], function () {
    return gulp.src("./styles/*")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./dist"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Angular template cachek feltöltése, hogy ne kelljen a külön html fájlokra futtatni több kérést
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("build-template-cache", ["clean"], function () {
    
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    return gulp.src("./html/*.html")
        .pipe(ngHtml2Js({
        moduleName: "templatesModule",
        prefix: "/html/"
    }))
        .pipe(concat("templates.js"))
        .pipe(gulp.dest("./dist/js/"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// jshint futtatása
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("jshint", function () {
    gulp.src("/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// karma tesztek futtatása
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("test", ["build-js"], function () {
    var testFiles = [
        "./tests/*.js"
    ];
    
    return gulp.src(testFiles)
        .pipe(karma({
        configFile: "karma.conf.js",
        action: "run"
    }))
        .on("error", function (err) {
        console.log("karma tests failed: " + err);
        throw err;
    });
});

/////////////////////////////////////////////////////////////////////////////////////
//
// javascript build, a fájlok sorrendjét a browserify határozza meg
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("build-js", ["clean"], function () {
    var b = browserify({
        entries: "./js/app.js",
        debug: true,
        paths: ["./js/controllers", "./js/services", "./js/directives"],
        transform: [ngAnnotate]
    });
    
    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .on("error", gutil.log)
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist/js/"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// teljes build
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("build", ["clean", "build-css", "build-template-cache", "jshint", "build-js"], function () {
    return gulp.src("index.html")
        .pipe(cachebust.references())
        .pipe(gulp.dest("dist"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// figyeli a fájlrendszert, és indít egy build folyamatot ha változás történik
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("watch", function () {
    return gulp.watch(["./index.html", "./html/*.html", "./styles/*.*css", "./js/**/*.js"], ["build"]);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// alapértelemzett feladat
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task("default", ["build", "test"]);