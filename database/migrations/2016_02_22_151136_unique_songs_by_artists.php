<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UniqueSongsByArtists extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('songs', function($table){
            $table->dropUnique('songs_name_unique');
        });

        Schema::table('songs', function($table){
            $table->unique(['name', 'artist_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('songs', function($table){
            $table->dropUnique('songs_name_artist_id_unique');
        });

        Schema::table('songs', function($table){
            $table->unique('name');
        });
    }
}
