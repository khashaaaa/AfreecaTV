<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class GasController extends Controller
{
    public function FetchGas()
    {
        $gas = DB::select("SELECT * FROM GAS ORDER BY date LIMIT 96");

        return response() -> json($gas);
    }
}