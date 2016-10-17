const gulp = require('gulp')
const connect = require('gulp-connect')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const del = require('del')
const runSequence = require('run-sequence')
const source = require('vinyl-source-stream')
const sass = require('gulp-sass')
const debug = require('gulp-debug')

gulp.task('clean', function () {
    return del('dist')
})

gulp.task('transpile', function () {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/lib'));
})

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            errLogToConsole: true,
            includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
        }))
        .pipe(gulp.dest('dist'));
})

gulp.task('copy', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
})

gulp.task('bundle', function () {
    return browserify('dist/lib/app.js', { debug: true })
        .bundle()
        .pipe(source('es6-template.js'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})

gulp.task('build', function () {
    return runSequence(['transpile', 'copy', 'sass'], 'bundle');
})

gulp.task('serve', function () {
    connect.server({
        name: 'es6 template - demo',
        port: 3001,
        root: 'dist',
        livereload: true
    })
})

gulp.task('run', ['build', 'serve'], function () {
    gulp.watch('src/**/*', ['build']);
})