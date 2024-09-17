<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    public function get(Request $request)
    {
        if(!$request->hasHeader('authorization')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $authorisation = $request->header('authorization');
        $token = explode(' ', $authorisation)[1];
        $requester = User::where('remember_token', $token)->first();
        if($requester === null) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if($requester->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        // all users ordered by derniere connexion descending cached its minutes : 60
        $users = Cache::remember(
            60,
            'users_all',
            function () use ($request
            ) {
            return User::orderBy('last_login', 'desc')->get();
        });

        $response = [
            'users' => $users,
            'message' => 'List of all users'
        ];

        return response()->json($response, 200);
    }

    public function create(Request $request)
    {
        $login = $request->get('login');
        $site = $request->get('site');
        $role = $request->get('role');
        $groupe = $request->get('groupe');
        $activation = $request->get('activation');

        if ($login === null || $site === null || $role === null || $groupe === null || $activation === null) {
                return response()->json(['message' => 'Données manquantes'], 400);
        }

        // if user login already exists
        $user = User::where('login', $login)->first();
        if ($user !== null) {
            return response()->json(['message' => 'Login existe déjà'], 400);
        }

        $user = new User();
        $user->name = $request->get('name');
        $user->login = $login;
        $user->site = $site;
        $user->role = $role;
        $user->groupe = $groupe;
        $user->status = (int)$activation;
        $user->save();

        return response()->json([
            'message' => 'User created',
            'user' => $user
        ]);
    }

    public function show($id) : object
    {
        $user = User::where('id', $id)->first();

        if ($user === null) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function getUserByToken($token)
    {

        $user = Cache::rememberForever('user-token-' . $token, function () use ($token) {
            return User::where('remember_token', $token)->first();
        });

        $response = [
            'token' => !($user === null),
        ];
        return response()->json($response);
    }

    public function delete($id)
    {
        $user = User::where('id', $id)->first();

        if ($user) {
            $user->delete();
        }

        return response()->json(['message' => 'User deleted']);
    }

    public function activate(Request $request, string $id)
    {
        $user = User::where('id', $id)->first();
        if ($user === null) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $status = $request->get('status');

        if ($status === null) {
            return response()->json(['message' => 'Status not found'], 404);
        }

        User::where('id', $id)->update([
            'status' => $status
        ]);

        return response()->json(['message' => 'User updated']);
    }
}
