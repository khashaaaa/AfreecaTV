<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class StockCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'record:stock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert stocks data into database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // This url has problem with SSL. I disabled SSL verification on Guzzle
        $data = Http::get("https://www.ebestsec.co.kr/partner/overseas/afreecaTV/real_investment_toDayBalanceRate.jsp");
        $values = $data["CIDBQ08800"]["OutBlock1"];

        foreach($values as $item)
        {
            $sellrate = $item["SellRat"];
            $buyrate = $item["BuyRat"];
            $avgbuy = $item["BuyBasePrc"];
            $avgsell = $item["SellBsprc"];
            $name = $item["PrdtNm"];
            date_default_timezone_set('Asia/Ulaanbaatar');
            $date = date("Y-m-d H:i");

            $newavgbuy = str_replace(',', '', $avgbuy);
            $newavgsell = str_replace(',', '', $avgsell);

            switch($name) {
                case 'Corn':
                    DB::table('CORN')->insert([
                        'name' => $name,
                        'sellrate' => floatval($sellrate),
                        'buyrate' => floatval($buyrate),
                        'avgbuy' => rtrim(rtrim($newavgbuy, '0'), '.'),
                        'avgsell' => rtrim(rtrim($newavgsell, '0'), '.'),
                        'date' => $date
                    ]);
                    break;
                case 'Euro FX':
                    DB::table('EURO')->insert([
                        'name' => $name,
                        'sellrate' => floatval($sellrate),
                        'buyrate' => floatval($buyrate),
                        'avgbuy' => rtrim(rtrim($newavgbuy, '0'), '.'),
                        'avgsell' => rtrim(rtrim($newavgsell, '0'), '.'),
                        'date' => $date
                    ]);
                    break;
                case 'Natural Gas':
                    DB::table('GAS')->insert([
                        'name' => $name,
                        'sellrate' => floatval($sellrate),
                        'buyrate' => floatval($buyrate),
                        'avgbuy' => rtrim(rtrim($newavgbuy, '0'), '.'),
                        'avgsell' => rtrim(rtrim($newavgsell, '0'), '.'),
                        'date' => $date
                    ]);
                    break;
                case 'Gold':
                    DB::table('GOLD')->insert([
                        'name' => $name,
                        'sellrate' => floatval($sellrate),
                        'buyrate' => floatval($buyrate),
                        'avgbuy' => rtrim(rtrim($newavgbuy, '0'), '.'),
                        'avgsell' => rtrim(rtrim($newavgsell, '0'), '.'),
                        'date' => $date
                    ]);
                    break;
                case 'E-mini NASDAQ 100':
                    DB::table('NASDAQ')->insert([
                        'name' => $name,
                        'sellrate' => floatval($sellrate),
                        'buyrate' => floatval($buyrate),
                        'avgbuy' => rtrim(rtrim($newavgbuy, '0'), '.'),
                        'avgsell' => rtrim(rtrim($newavgsell, '0'), '.'),
                        'date' => $date
                    ]);
                    break;
                case 'Crude Oil (WTI)':
                    DB::table('OIL')->insert([
                        'name' => $name,
                        'sellrate' => floatval($sellrate),
                        'buyrate' => floatval($buyrate),
                        'avgbuy' => rtrim(rtrim($newavgbuy, '0'), '.'),
                        'avgsell' => rtrim(rtrim($newavgsell, '0'), '.'),
                        'date' => $date
                    ]);
                    break;
            }
        }
    }
}
