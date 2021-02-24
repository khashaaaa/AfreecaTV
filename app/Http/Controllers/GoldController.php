<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class GoldController extends Controller
{
    public function FetchGold()
    {
        $gold = DB::select("SELECT * FROM GOLD ORDER BY date LIMIT 96");

        return response() -> json($gold);
    }
}
