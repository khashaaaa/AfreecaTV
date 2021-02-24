<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CornController extends Controller
{
    public function FetchCorn()
    {
        $corn = DB::select("SELECT * FROM CORN ORDER BY date LIMIT 96");

        return response() -> json($corn);
    }
}