<?php

namespace App\Http\Controllers;

use AllowDynamicProperties;
use App\Models\Conteneur;
use App\Models\Email;
use Illuminate\Http\Request;
use App\Http\Controllers\EmailController;

#[AllowDynamicProperties]
class ConteneurController extends Controller
{

    public function __construct()
    {
        $this->emailer = new EmailController();
    }

    public function index()
    {
        $page = 1;
        $search = '';
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

        $conteneurs = Conteneur::
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

        return response()->json($conteneurs);
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
            'creator_id' => 'required|int'
        ]);
        $conteneur = Conteneur::create($validated_data);


        // email
        $emailsList = Email::all();
        $recipients = [];
        foreach ($emailsList as $email) {
            $recipients[] = $email->email;
        }
        $conteneur->load('creator');
        $emailData = [
            'numero' => $conteneur->numero,
            'quantity' => $conteneur->quantity,
            'reste' => $conteneur->reste,
            'created_at' => $conteneur->created_at,
            'creator' => $conteneur->creator->name,
            'creator_email' => $conteneur->creator->email,
            'url' => env('APP_URL').'/details/'.$conteneur->id
        ];
        $this->emailer->sendEmail($emailData, $recipients);

        return response()->json(
            [
                'message' => 'Conteneur créé',
                'article' => $conteneur
            ]
            ,201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Conteneur $conteneur)
    {
        $conteneur->load('creator');
        return response()->json($conteneur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conteneur $conteneur)
    {
        $validated_data = $request->validate([
            'numero' => 'required',
            'quantity' => 'required',
            'reste' => 'required'
        ]);

        $conteneur->update($validated_data);

        return response()->json(
            [
                'message' => 'Conteneur modifié',
                'article' => $conteneur
            ]
            ,200
        );

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conteneur $conteneur)
    {
        $conteneur->delete();

        return response()->json(
            [
                'message' => 'Conteneur supprimé'
            ]
            ,200
        );

    }
}
