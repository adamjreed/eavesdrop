var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.scripts([
        '../bower/jquery/dist/jquery.min.js',
        '../bower/bootstrap/dist/js/bootstrap.min.js',
        '../bower/angular/angular.min.js'
    ], 'public/js/vendor.js');
});

elixir(function(mix) {
    mix.styles([
        '../bower/bootstrap/dist/css/bootstrap.min.css',
    ], 'public/css/vendor.css');
});