<?php

Route::group(['middleware' => ['web']], function () {
    Route::get('/latest', 'PlaylistController@latest');
});
