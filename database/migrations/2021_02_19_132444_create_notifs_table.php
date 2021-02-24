<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotifsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifs', function (Blueprint $table) {
            $table->id();
            $table->enum('state', ['ON', 'OFF']);
            $table->string('scopes');
            $table->string('stocks');
            $table->enum('changebypercent', [5, 10, 20, 30, 40, 50]);
            $table->enum('changebyperiod', [30, 60, 90, 120, 150, 180]);
            $table->text('description');
            $table->string('buyrate');
            $table->string('sellrate');
            $table->string('admin');
            $table->string('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifs');
    }
}
