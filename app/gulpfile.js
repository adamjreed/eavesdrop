var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');

gulp.task('scripts', function() {
    return gulp.src([
            'public/**/*module*.js',
            'public/**/*service*.js',
            'public/**/*directive*.js',
            'public/**/*controller*.js',
            'public/**/*routes*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('less', function() {
    return gulp.src([
        'public/assets/less/*.less'
    ])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/assets/css'))
});

gulp.task('vendor-js', function() {
    return gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'

    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/assets/js/lib'));
});

gulp.task('vendor-css', function() {
    return gulp.src([
        'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/assets/css/lib'));
});

gulp.task('vendor-fonts', function() {
    return gulp.src([
        'bower_components/bootstrap/fonts/*.{ttf,woff,woff2,eot,svg}'
    ])
    .pipe(gulp.dest('public/assets/css/fonts'));
});

gulp.task('default', ['scripts', 'less']);

gulp.task('vendor', ['vendor-js', 'vendor-css', 'vendor-fonts']);

gulp.task('watch', function() {
    gulp.watch('public/**/*.js', ['scripts']);
    gulp.watch('public/assets/less/*.less', ['less']);
});