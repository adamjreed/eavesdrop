<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixSongIds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plays', function($table) {
            $table->dropForeign('plays_song_id_foreign');
            $table->dropColumn('song_id');
        });

        Schema::table('plays', function($table) {
            $table->integer('song_id')->unsigned();
        });

        Schema::table('songs', function($table) {
            $table->dropColumn('id');
            $table->dropColumn('name');
        });

        Schema::table('songs', function($table) {
            $table->increments('id')->unsigned();
            $table->string('name', 255);

            $table->unique('name');
        });

        Schema::table('plays', function($table) {
            $table->foreign('song_id')
                ->references('id')->on('songs')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plays', function($table) {
            $table->dropForeign('plays_song_id_foreign');
            $table->dropColumn('song_id');
        });

        Schema::table('songs', function($table) {
            $table->dropColumn('id');
            $table->dropColumn('name');
        });

        Schema::table('songs', function($table) {
            $table->integer('id');
            $table->text('name');

            $table->primary('id');
        });

        Schema::table('plays', function($table) {
            $table->integer('song_id');

            $table->index('song_id');
            $table->foreign('song_id')
                ->references('id')->on('songs')
                ->onDelete('cascade');
        });
    }
}
