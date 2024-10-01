<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Image::limit(100)
            ->with('creator')
            ->with('conteneur')
            ->orderBy('created_at', 'desc')
            ->get();

        $response = [
            'message' => 'List of all images',
            'images' => $images
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated_data = $request->validate([
            'conteneur_numero' => 'nullable',
            'conteneur_id' => 'required',
            'creator_id' => 'required',
            'data' => 'required|image',
            'index' => 'required',
            'extension' => 'required',
        ]);


        // move and rename image as per the conteneur_numero in public/images
        $image = $request->file('data');
        $date_now = date('Y-m-d_H:i');
        $image_name = $validated_data['conteneur_numero'] . '_' . $validated_data['index'] . '_' . $date_now . '.' . $validated_data['extension'];
        $image->move(public_path('images'), $image_name);

        // create table image
        $validated_data['name'] = $image_name;
        $validated_data['path'] = 'images/' . $image_name;

        $image = Image::create($validated_data);

        $response = [
            'message' => 'Image created',
            'image' => $image
        ];

        return response()->json($response, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        $image->load(['creator', 'conteneur']);
        return response()->json($image, 200);
    }
    public function showImageByConteneur($id)
    {
        $images = Image::where('conteneur_id', '=', (int)$id)
            ->with('creator')
            ->with('conteneur')
            ->get();

        $response = [
            'message' => 'List of all images',
            'images' => $images
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
