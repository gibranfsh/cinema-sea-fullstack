<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        /**@var User $user */
        $user = User::create([
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
            'name' => $data['name'],
            'age' => $data['age'],
            'balance' => 0
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Invalid credentials'], 422);
        }

        /**@var User $user */
        $user = Auth::user(); // User::where('username', $credentials['username'])->first();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /**@var User $user */
        $user = $request->user();
        $user->tokens()->delete(); // tokens()->delete();

        return response('', 204);
    }
}
