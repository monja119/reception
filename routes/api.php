<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConteneurController;
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
Route::apiResource('conteneurs', ConteneurController::class);
Route::group(['prefix' => 'conteneur'], function () {
    Route::get('/{id}/images', [ImageController::class, 'showImageByConteneur'])->name('showImageByConteneur');
});

// images
Route::apiResource('images', ImageController::class);

// route test
Route::get('/test', function () {
    return response()->json(['message' => 'Reussi!']);
});

Route::get('/', function () {
    return response()->json(['message' => 'welcome!']);
});

// x3
Route::apiResource('x3', X3Controller::class);
