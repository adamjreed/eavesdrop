<?php

Route::get('/', function() {
    return File::get(public_path() . '/app/index.html');
});

// API ROUTES ==================================
Route::group(array('prefix' => 'api'), function() {
    Route::get('latest', 'PlaylistController@latest');
});