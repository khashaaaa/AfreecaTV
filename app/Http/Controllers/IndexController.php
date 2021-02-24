<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    public function Index()
    {
        $list = [
            "nasdaq" => DB::select("SELECT * FROM NASDAQ ORDER BY id DESC LIMIT 1"),
            "oil" => DB::select("SELECT * FROM OIL ORDER BY id DESC LIMIT 1"),
            "gas" => DB::select("SELECT * FROM GAS ORDER BY id DESC LIMIT 1"),
            "euro" => DB::select("SELECT * FROM EURO ORDER BY id DESC LIMIT 1"),
            "gold" => DB::select("SELECT * FROM GOLD ORDER BY id DESC LIMIT 1"),
            "corn" => DB::select("SELECT * FROM CORN ORDER BY id DESC LIMIT 1")
        ];

        return response() -> json($list);
    }

    public function DataSheet()
    {
        $list = [
            "corn" => DB::select("SELECT * FROM CORN ORDER BY id DESC"),
            "euro" => DB::select("SELECT * FROM EURO ORDER BY id DESC"),
            "gas" => DB::select("SELECT * FROM GAS ORDER BY id DESC"),
            "oil" => DB::select("SELECT * FROM OIL ORDER BY id DESC"),
            "gold" => DB::select("SELECT * FROM GOLD ORDER BY id DESC"),
            "nasdaq" => DB::select("SELECT * FROM NASDAQ ORDER BY id DESC")
        ];

        return response() -> json($list);
    }
}
