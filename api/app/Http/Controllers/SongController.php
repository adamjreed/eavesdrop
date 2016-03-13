<?php

namespace App\Http\Controllers;

use App\Repositories\SongRepository;
use Illuminate\Http\Request;

use App\Http\Requests;
use Exception;

class SongController extends Controller
{
    protected $songs;
    protected $defaultPeriod = '24 hours';
    protected $periods = array('24 hours', '1 week', '1 month', '1 year');

    public function __construct(SongRepository $songRepository) {
        $this->songs = $songRepository;
    }

    public function index(Request $request) {
        try {
            $period = $this->_validatePeriod($request);

            return response()
                ->json([
                    'meta' => ['status' => 200],
                    'response' => $this->songs->top($period)
                ])
                ->setCallback($request->callback);
        }catch(Exception $e) {
            return $this->_error($e->getMessage(), $request);
        }
    }
}