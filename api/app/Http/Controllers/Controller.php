<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Exception;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $defaultPeriod = 0;
    protected $periods = [];

    protected function _validatePeriod($request) {
        $period = $request->period ? $request->period : $this->defaultPeriod;

        if(!in_array($period, $this->periods)) {
            throw new Exception('Invalid period length specified.');
        }

        return $period;
    }

    protected function _error($message, $request) {
        return response()->json(['meta' => ['status' => 400], 'response' => $message], 400)->setCallback($request->callback);
    }
}
