<?php

use App\Http\Controllers\CornController;
use App\Http\Controllers\EuroController;
use App\Http\Controllers\GasController;
use App\Http\Controllers\GoldController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\NasdaqController;
use App\Http\Controllers\NotifController;
use App\Http\Controllers\OilController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/user', function() {
    return view('user.Landing');
});
Route::get('/', [IndexController::class, 'index']);
Route::get('/nasdaq', [NasdaqController::class, 'fetchnasdaq']);
Route::get('/oil', [OilController::class, 'fetchoil']);
Route::get('/gas', [GasController::class, 'fetchgas']);
Route::get('/euro', [EuroController::class, 'fetcheuro']);
Route::get('/gold', [GoldController::class, 'fetchgold']);
Route::get('/corn', [CornController::class, 'fetchcorn']);

Route::get('/admin', function() {
    return view('admin.Landing');
});
Route::get('/admin/datasheet', [IndexController::class, 'datasheet']);
Route::post('/admin/create-notif', [NotifController::class, 'savenotif']);
Route::get('/admin/notifications', [NotifController::class, 'listnotif']);
Route::get('/admin/history', [NotifController::class, 'fetchhistory']);
Route::put('/admin/update-notif/{id}', [NotifController::class, 'updatenotif']);
Route::delete('/admin/delete-notif/{id}', [NotifController::class, 'deletenotif']);