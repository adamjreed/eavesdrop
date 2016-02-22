<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $fillable = ["name"];
    
    public $timestamps = false;

    public function songs() {
        return $this->hasMany(Song::class);
    }
}
