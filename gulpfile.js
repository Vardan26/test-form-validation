//utils
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const image = require('gulp-image');

//css
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//babel + browserify
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

var imgPrefs = {
    pngquant: true,
    optipng: true,
    zopflipng: true,
    jpegRecompress: true,
    mozjpeg: true,
    guetzli: false,
    gifsicle: false,
    svgo: true,
    concurrent: 10
};


gulp.task('default', ['sass', 'babel', 'images'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch('./src/assets/styles/**/*.scss', ['sass']);
    gulp.watch('./src/assets/js/*.js', ['babel']);
});

gulp.task('sass', () => {
    const plugins = [autoprefixer({browsers: ['last 4 versions']}), cssnano()];
    return gulp.src('./src/assets/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


gulp.task('images', () => {
    return gulp.src('./src/assets/img/**/*.{png,jpg,jpeg,gif,svg}')
        // .pipe(changed('dist'))
        .pipe(image(imgPrefs))
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('babel', function() {
    browserify({
        entries: './src/assets/js/main.js',
        debug: true
    })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});