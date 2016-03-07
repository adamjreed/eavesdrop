<?php

namespace App\Http\Controllers;

use App\Repositories\PlayRepository;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class LatestController extends Controller
{
    protected $plays;
    protected $periods = array(90, 180, 300, 480);

    public function __construct(PlayRepository $playRepository) {
        $this->plays = $playRepository;
    }

    public function index(Request $request) {
        if(!$request->period) {
            $period = 90;
        } else {
            if(!$this->_validatePeriod($request->period)) {
                return response()->json(['meta' => ['status' => 400], 'response' => 'Invalid period length specified.'], 400)->setCallback($request->callback);
            }
            $period = $request->period;
        }
        
        return response()->json(['meta' => ['status' => 200], 'response' => $this->plays->recent($period)->toArray()])->setCallback($request->callback);
    }

    protected function _validatePeriod($period) {
        return in_array($period, $this->periods);
    }
}