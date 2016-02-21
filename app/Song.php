<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = ["id", "name", "artist"];

    public $timestamps = false;

    public $incrementing = false;

    public function plays() {
        return $this->hasMany(Play::class);
    }
}
