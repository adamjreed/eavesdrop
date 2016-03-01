<?php
// API ROUTES ==================================
Route::group(array('prefix' => 'v1'), function() {
    Route::get('latest', 'PlaylistController@latest');
});