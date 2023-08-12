<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SeatsController;
use App\Http\Controllers\Api\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/seats', [SeatsController::class, 'store']);
    Route::get('/seats/{movie_id}', [SeatsController::class, 'index']);
    Route::put('/seats/{movie_id}', [SeatsController::class, 'update']);

    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/tickets/{user_id}', [TicketController::class, 'getByUserId']);
    Route::delete('/tickets/{id}', [TicketController::class, 'destroy']);
});
