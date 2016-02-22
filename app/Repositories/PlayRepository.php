<?php

namespace App\Repositories;

use App\Play;
use App\Song;

class PlayRepository
{
    /**
     * Get songs played within the last $period minutes.
     *
     * @param int $period
     * @return Collection
     */
    public function recent($period) {
        return $this->duringRange(date('Y-m-d H:i:s-5:00', strtotime('-' . $period . ' minutes')));
    }

    /**
     * Get all the times a song was played.
     *
     * @param Song $song
     * @return Collection
     */
    public function forSong(Song $song) {
        return Play::where('song_id', $song->id)
                    ->orderBy('played_at', 'asc')
                    ->get();
    }

    /**
     * Get all songs played during a specified time range, or since the start if end is not given.
     *
     * @param string $start
     * @param string|null $end
     * @return Collection
     */
    public function duringRange($start, $end = null) {
        $plays = Play::with('song.artist')
            ->where('played_at', '>', $start);

        if($end) {
            $plays->where('played_at', '<', $end);
        }

        $plays->orderBy('played_at', 'desc');

        return $plays->get();
    }
}