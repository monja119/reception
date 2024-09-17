<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // client data
        $login = $request->input('login');
        $password = $request->input('password');

        // user
        $user = User::where('login', $login)->first();

        if (!$user) {
            $error = 'Identifiant inconnu';
            return response()->json([
                'error' => $error,
                'message' => 'Identifiant inconnu'
            ])->setStatusCode(401);
        }

        // verification de status
        if($user->status == 0) {
            $error = 'Votre compte est désactivé';
            return response()->json([
                'error' => $error,
                'message' => 'Votre compte est désactivé'
            ])->setStatusCode(401);
        }

        // verification de mot de passe
        $auth = $this->connection($login, $password);
        $connection =$auth->connection;
        if (!$connection->connection) {
            $error = 'Mot de passe incorrect';
            return response()->json([
                'error' => $error,
                'message' => 'Mot de passe incorrect'
            ])->setStatusCode(401);
        }

        if(!$user->remember_token) {
            $token = bin2hex(random_bytes(32));
            User::where('login', $login)->update([
                'remember_token' => $token
            ]);
        }

        // last login
        $last_login = Carbon::now()->toDateTimeString();

        User::where('login', $login)->update([
            'last_login' => $last_login
        ]);

        $new_user = User::where('login', $login)->first();

        // forget 'users_all' cache
        Cache::forget('users_all');

        return response()->json([
            'user' => $new_user,
            'message' => 'Connexion réussie'
        ])->setStatusCode(200);

    }

    public function logout($token)
    {
        $user = User::where('remember_token', $token)->first();
        Cache::forget('user-token-' . $token);

        if ($user === null) {
            return response()->json(['message' => 'Logout success']);
        }

        User::where('remember_token', $token)->update(['remember_token' => null]);

        return response()->json(['message' => 'Logout success']);
    }

    public function connection($login, $password)
    {
        // curl request to talys auth api
        $url = env('TALYS_AUTH_URL');
        $key = env('TALYS_AUTH_KEY');
        $data = [
            "login" => $login,
            "password" => $password
        ];

        $jsonData = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'key: '.$key,
                'X-CSRF-TOKEN: '.csrf_token()
            ),
            CURLOPT_POSTFIELDS => $jsonData,
        ));


        $curl_response = curl_exec($curl);

        curl_close($curl);
        return json_decode($curl_response);
    }


}
