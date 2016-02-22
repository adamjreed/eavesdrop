<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artists', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);

            $table->index('name');
            $table->unique('name');
        });

        Schema::table('songs', function($table)
        {
            $table->dropColumn('artist');
            $table->integer('artist_id')->unsigned();

            $table->index('artist_id');
            $table->foreign('artist_id')
                ->references('id')->on('artists')
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
        Schema::table('songs', function($table)
        {
            $table->dropForeign('songs_artist_id_foreign');
            $table->dropColumn('artist_id');
            $table->text('artist');
        });

        Schema::drop('artists');
    }
}
