<?php

namespace App\Http\Controllers;

use App\Repositories\PlayRepository;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class LatestController extends Controller
{
    protected $plays;
    protected $defaultPeriod = 90;
    protected $periods = array(90, 180, 300, 480);

    public function __construct(PlayRepository $playRepository) {
        $this->plays = $playRepository;
    }

    public function index(Request $request) {
        try {
            $period = $this->_validatePeriod($request);

            return response()
                ->json([
                    'meta' => ['status' => 200],
                    'response' => $this->plays->recent($period)->toArray()
                ])
                ->setCallback($request->callback);
        }catch(Exception $e) {
            return $this->_error($e->getMessage(), $request);
        }
    }
}