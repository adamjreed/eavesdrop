var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.scripts([
        '../bower/angular/angular.min.js',
        '../bower/angular-route/angular-route.min.js'
    ], 'public/assets/js/lib/vendor.js');

    mix.scripts([
        'public/app/**/*module*.js',
        'public/app/**/*controller*.js',
        'public/app/**/*service*.js',
        'public/app/**/*routes*.js'
    ],
        'public/assets/js/app.js',
        'public/app'
    );

    mix.styles([
        '../bower/bootstrap/dist/css/bootstrap.min.css',
    ], 'public/assets/css/lib/vendor.css');
});