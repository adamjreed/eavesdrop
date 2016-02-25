var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');

gulp.task('scripts', function() {
    return gulp.src([
            'public/app/**/*module*.js',
            'public/app/**/*controller*.js',
            'public/app/**/*service*.js',
            'public/app/**/*routes*.js'
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
         'resources/assets/bower/angular/angular.min.js',
         'resources/assets/bower/angular-route/angular-route.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/assets/js/lib'));
});

gulp.task('vendor-css', function() {
    return gulp.src([
            'resources/assets/bower/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('public/assets/css/lib'));
});

gulp.task('default', ['scripts', 'less']);

gulp.task('vendor', ['vendor-js', 'vendor-css']);

gulp.task('watch', function() {
    gulp.watch('public/app/**/*.js', ['scripts']);
    gulp.watch('public/assets/less/*.less', ['less']);
});

