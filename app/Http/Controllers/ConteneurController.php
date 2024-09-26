<?php

namespace App\Http\Controllers;

use App\Models\Conteneur;
use Illuminate\Http\Request;

class ConteneurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $page = 1;
        $search = '';
//
//        initial_date : data.initial_date,
//            final_date : data.final_date
        $initial_date = '';
        $final_date = '';

        $per_page = 100;
        if(request()->get('page')) {
            $page = request()->get('page');
        }
        if(request()->get('search')) {
            $page = 1;
            $search = request()->get('search');
        }
        if(request()->get('initial_date')) {
            $initial_date = request()->get('initial_date');
        }
        if(request()->get('final_date')) {
            $final_date = request()->get('final_date');
        }

        $articles = Conteneur::
        when($search, function($query) use ($search) {
            return $query->where('numero', 'like', '%'.$search.'%');
        })
            ->when($initial_date, function($query) use ($initial_date) {
                return $query->whereDate('created_at', '>=', $initial_date);
            })
            ->when($final_date, function($query) use ($final_date) {
                return $query->whereDate('created_at', '<=', $final_date);
            })
            ->orderBy('id', 'desc')
            ->paginate($per_page, ['*'], 'page', $page);

        return response()->json($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated_data = $request->validate([
            'numero' => 'required',
            'quantity' => 'required',
            'reste' => 'required',
            'creator_id' => 'required'
        ]);

        $article = Conteneur::create($validated_data);

        return response()->json(
            [
                'message' => 'Article créé',
                'article' => $article
            ]
            ,201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Conteneur $article)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conteneur $article)
    {
        $validated_data = $request->validate([
            'numero' => 'required',
            'quantity' => 'required',
            'reste' => 'required'
        ]);

        $article->update($validated_data);

        return response()->json(
            [
                'message' => 'Article modifié',
                'article' => $article
            ]
            ,200
        );

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conteneur $article)
    {
        $article->delete();

        return response()->json(
            [
                'message' => 'Article supprimé'
            ]
            ,200
        );

    }
}
