<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class OilController extends Controller
{
    public function FetchOil()
    {
        $oil = DB::select("SELECT * FROM OIL ORDER BY date LIMIT 96");

        return response() -> json($oil);
    }
}
