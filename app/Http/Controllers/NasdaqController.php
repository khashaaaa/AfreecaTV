<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class NasdaqController extends Controller
{
    public function FetchNasdaq()
    {
        $nasdaq = DB::select("SELECT * FROM NASDAQ ORDER BY date LIMIT 96");

        return response() -> json($nasdaq);
    }
}
