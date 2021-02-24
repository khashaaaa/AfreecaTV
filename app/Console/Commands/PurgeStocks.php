<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PurgeStocks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'purge:stocks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Truncate a database table in a given time';

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
        // Truncate all tables
        DB::table('NASDAQ')->truncate();
        DB::table('OIL')->truncate();
        DB::table('GAS')->truncate();
        DB::table('EURO')->truncate();
        DB::table('GOLD')->truncate();
        DB::table('CORN')->truncate();
    }
}
