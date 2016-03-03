<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Play extends Model
{
    protected $fillable = ["song_id", "played_at"];

    public $timestamps = false;

    public function song() {
        return $this->belongsTo(Song::class);
    }
}
