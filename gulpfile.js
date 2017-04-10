// Modules
var gulp = require("gulp");
var less = require("gulp-less");
var cssmin = require("gulp-cssmin");
var notify = require("gulp-notify");

// Default-Task
gulp.task("default", ["watch"]);

// Watch-Task
gulp.task("watch", function() {
    gulp.watch("src/less/**/*.less", ["less"]);
    gulp.watch("src/*.html", ["html"]);
});

// LESS-Task
gulp.task("less", function() {
    return gulp.src("src/less/index.less")
        .pipe(less())
        .on("error", function(error) {
            notify.onError({
                title: "Gulp (LESS)",
                message: "<%= error.message %>",
                sound: "Basso",
                icon: "Terminal Icon"
            })(error);
            this.emit("end");
        })
        .pipe(gulp.dest("www/css/"))
        .pipe(cssmin({ advanced: false }))
        .pipe(gulp.dest("www/css/"))
        .pipe(notify({
            sound: false,
            icon: "Terminal Icon",
            title: "Gulp (LESS)",
            message: "www/css/<%= file.relative %> kompiliert.",
        }));
});

// HTML-Task
gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("www"))
        .pipe(notify({
            sound: false,
            icon: "Terminal Icon",
            title: "HTML",
            message: "www/<%= file.relative %> kopiert.",
        }));
});
