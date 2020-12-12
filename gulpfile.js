"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/";
// const dist = "/Applications/MAMP/htdocs/test"; // Ссылка на вашу папку на сервере

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest(dist))
        .pipe(browsersync.stream());
});

gulp.task('sass',  () => {
    return gulp.src('./src/assets/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 3 versions']
        }))
        .pipe(gulp.dest(dist+'assets/css/'))
        .pipe(browsersync.stream());
});


gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: false,
                                    corejs: 3,
                                    useBuiltIns: "usage",
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist))
        .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src(["./src/assets/**/*.*","!./src/assets/sass/*.*",])
        .pipe(gulp.dest(dist + "/assets"))
        .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
        server: {
            baseDir: "./dist/",
            serveStaticOptions: {
                extensions: ["html"]
            }
        },
        port: 4000,
        notify: true
    });

    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/sass/*.sass", gulp.parallel("sass"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "sass", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));