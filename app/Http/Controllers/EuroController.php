<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class EuroController extends Controller
{
    public function FetchEuro()
    {
        $euro = DB::select("SELECT * FROM EURO ORDER BY date LIMIT 96");

        return response() -> json($euro);
    }
}