<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = ["name", "artist_id"];

    public $timestamps = false;

    public function artist() {
        return $this->belongsTo(Artist::class);
    }

    public function plays() {
        return $this->hasMany(Play::class);
    }
}
