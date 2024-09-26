<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\X3;

class X3Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $numero = $id;
        $data = X3::select('SHIPUID_0')
            ->where(DB::raw('UPPER(SHIPUID_0)'), 'like', '%' . strtoupper($numero) . '%')
            ->limit(100)->get();

        $data = $data->map(function($item) {
            return array_map('utf8_encode', $item->toArray());
        });


        $response = [
            'data' => $data,
            'message' => 'Shipment found'
        ];
        return response()->json($response);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
