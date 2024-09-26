<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\X3Controller;

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::get('logout/{token}', [AuthController::class, 'logout'])->name('logout');
});


Route::group(['prefix' => 'users'], function () {
    Route::get('/', [UserController::class, 'get'])->name('getAllUsers');
    Route::post('/', [UserController::class, 'create'])->name('createUser');
    Route::get('/get/{id}', [UserController::class, 'show'])->name('getUserById');
    Route::delete('/{id}', [UserController::class, 'delete'])->name('deleteUserById');

    # activation user
    Route::put('/activate/{id}', [UserController::class, 'activate'])->name('activateUser');

    # token user
    Route::get('/token/{token}', [UserController::class, 'getUserByToken'])->name('getUserByToken');
    Route::delete('/logout/{token}', [UserController::class, 'logout'])->name('deleteUserToken');
});

// articles
Route::apiResource('articles', ArticleController::class);

// route test
Route::get('/test', function () {
    return response()->json(['message' => 'Reussi!']);
});

// x3
Route::apiResource('x3', X3Controller::class);
