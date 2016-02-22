<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use App\Song;
use App\Artist;

class UpdatePlaylist extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'playlist:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch the last 90 minutes of tracks played on the radio and log them to 
        the playlist database.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Query the API for playlist info and make sure that we get a valid response before calling _savePlaylist.
     *
     * @return mixed
     */
    public function handle()
    {
        $api = new Client();

        try {
            $res = $api->request('GET',
                'http://api.tunegenie.com/v1/brand/nowplaying',
                ['query' => [
                        'apiid' => 'm2g_bar',
                        'b' => 'wwwqh2',
                        'since' => date('Y-m-d\TH:i:sP', strtotime('-90 minutes'))
                    ]
                ]
            );
        }catch (\Exception $e) {
            echo $e->getMessage();
            return;
        }

        $status = $res->getStatusCode();
        $contentType = $res->getHeader('Content-Type');

        if($status == 200 && !empty($contentType) && $contentType[0] == 'application/json') {
            try {
                $this->_savePlaylist($res->getBody());
            } catch(\Exception $e) {
                echo "Got a valid response from the API, but something went wrong when parsing it and saving to the 
                    database:\n" . $e->getMessage();
                return;
            }
        } else {
            echo "Invalid response from API. Got status code " . $status . " and content-type '"
                . $contentType[0] . "'.";
        }
    }

    /**
     * Parse the returned json and save each track to the database.
     * 
     * @param $body
     * @throws \Exception
     */
    protected function _savePlaylist($body) {
        $json = json_decode($body, true);

        if(!empty($json['response'])) {
            foreach($json['response'] as $playedSong) {
                $artist = Artist::firstOrCreate([
                    'name' => $playedSong['artist']
                ]);

                $song = Song::firstOrCreate([
                    'name' => $playedSong['song'],
                    'artist_id' => $artist->id
                ]);

                if(!$song->plays()->where('played_at', "=", $playedSong['played_at'])->first()) {
                    $song->plays()->create([
                        'song_id' => $song->id,
                        'played_at' => $playedSong['played_at']
                    ]);
                }
            }
        } else {
            throw new \Exception('Playlist data in the JSON object was empty.');
        }
    }
}