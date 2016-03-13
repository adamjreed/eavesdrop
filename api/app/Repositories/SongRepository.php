<?php

namespace App\Repositories;

use App\Play;
use App\Song;
use App\Artist;

use Illuminate\Support\Facades\DB;

class SongRepository
{
    /**
     * Get songs most frequently played over the last $period of time.
     *
     * @param string $period
     * @return Array
     */
    public function top($period) {
        return DB::table('songs')
            ->leftJoin('plays', 'songs.id', '=', 'plays.song_id')
            ->leftJoin('artists', 'songs.artist_id', '=', 'artists.id')
            ->select('songs.id', 'songs.name', 'artists.name as artist', DB::raw('COUNT(plays.id) as total_plays'))
            ->where('plays.played_at', '>', date('Y-m-d H:i:s', strtotime('-' . $period)))
            ->groupBy('songs.id')
            ->orderBy('total_plays', 'desc')
            ->get();
    }

    /**
     * Get all songs for a given artist.
     *
     * @param Artist $artist
     * @return Collection
     */
    public function forArtist(Artist $artist) {
        return Song::where('artist_id', $artist->id)
            ->orderBy('name', 'asc')
            ->get();
    }
}