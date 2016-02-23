<?php

Route::get('/', function() {
    return view('index');
});

// API ROUTES ==================================
Route::group(array('prefix' => 'api'), function() {
    Route::get('latest', 'PlaylistController@latest');
});