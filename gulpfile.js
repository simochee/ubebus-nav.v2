const gulp = require('gulp')
// for BrowserSync
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync')
// for Webpack
// const webpack = require('gulp-webpack')
// for Rollup
// const rollup = require('gulp-rollup')
// const rollup = require('rollup-stream')
// const source = require('vinyl-source-stream')
// const rename = require('gulp-rename')
// const uglify = require('gulp-uglify')
// const buffer = require('vinyl-buffer')
const watch = require('gulp-watch')
const sourcemaps = require('gulp-sourcemaps')
// for Stylus
const plumber = require('gulp-plumber')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')

gulp.task('browsersync', () => {
    browserSync.init(null, {
        files: ['app.js', 'views/**/*.*', 'public/**/*.*', 'routes/**/*.*', 'models/**/*.*'],
        proxy: 'http://localhost:3000',
        port: 43002,
        open: true,
        // notify: true,
        // stream: true
    })
})

gulp.task('serve', ['browsersync'], () => {
    nodemon({
        script: './bin/www',
        ext: 'js pug',
        ignore: [
            'node_modules',
            'bin',
            'views',
            'public',
            'src'
        ],
        env: {
            'NODE_ENV': 'development'
        },
        stdout: false
    }).on('readable', function() {
        this.stdout.on('data', (chunk) => {
            if(/^Express\ server\ listening/.test(chunk)) {
                browserSync.reload()
            }
            process.stdout.write(chunk)
        })
        this.stderr.on('data', (chunk) => {
            process.stderr.write(chunk)
        })
    })
})

// gulp.task('webpack', () => {
//     gulp.src('')
//         .pipe(webpack( require('./webpack.config.js') ))
//         .pipe(gulp.dest('./public/js'))
// })

// gulp.task('rollup', () => {
//     return rollup( require('./rollup.config.js') )
//         .pipe(plumber())
//         .pipe(source('entry.js', './src/scripts'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(rename('bundle.min.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./public/js'))
// })

gulp.task('stylus', () => {
    gulp.src('./src/styles/!(_)*.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss([ cssnext({ browsers: ['last 1 version'] }) ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
})

gulp.task('build', ['stylus'], () => {
    watch(['./src/(styles|modules|pages)/**/*.styl'], () => {
        gulp.start('stylus')
        browserSync.stream()
    })
    watch(['./src/(scripts|modules|pages)/**/*.(js|tag.html)'], () => {
        // gulp.start('webpack')
        browserSync.reload()
    })
})

gulp.task('dev', ['serve', 'build'])