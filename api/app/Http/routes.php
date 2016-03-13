<?php
// API ROUTES ==================================
Route::group(array('prefix' => 'v1'), function() {
    /** latest */
    Route::get('latest', 'LatestController@index');

    /** songs */
    Route::get('songs', 'SongController@index');
});