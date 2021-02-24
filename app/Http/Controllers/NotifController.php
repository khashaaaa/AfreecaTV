<?php

namespace App\Http\Controllers;

use App\Models\Notifs;
use Illuminate\Http\Request;

class NotifController extends Controller
{
    public function savenotif(Request $request)
    {
        $notif = new Notifs;
        $notif->state = $request->state;
        $notif->scopes = $request->scopes;
        $notif->stocks = $request->stocks;
        $notif->changebypercent = $request->changebypercent;
        $notif->changebyperiod = $request->changebyperiod;
        $notif->description = $request->description;
        $notif->buyrate = $request->buyrate;
        $notif->sellrate = $request->sellrate;
        $notif->admin = $request->admin;
        $notif->date = $request->date;
        $notif->save();

        return response()->json($notif);
    }

    public function listnotif()
    {
        $list = Notifs::all();

        return response()->json($list);
    }

    public function updatenotif($id)
    {
        $notif = Notifs::find($id);

        if($notif) {
            
            switch($notif->state) {
                case 'OFF':
                    $notif->state = 'ON';
                    $notif->save();
                    break;
                case 'ON':
                    $notif->state = 'OFF';
                    $notif->save();
                    break;
            }
        };

        $updated = Notifs::find($id);

        return response()->json($updated);
    }

    public function deletenotif($id)
    {
        $notif = Notifs::find($id);
        $notif->delete();
    }

    public function fetchhistory()
    {
        $notif = Notifs::where('state', 'ON')->get();

        return response()->json($notif);
    }
}