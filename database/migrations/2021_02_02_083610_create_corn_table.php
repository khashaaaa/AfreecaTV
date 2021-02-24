<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCornTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('CORN', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('buyrate');
            $table->string('sellrate');
            $table->string('avgbuy');
            $table->string('avgsell');
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
        Schema::dropIfExists('CORN');
    }
}
