<?php

namespace App\Http\Controllers\Api;

use App\Models\Seats;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SeatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($movie_id)
    {
        $seats = Seats::where('movie_id', $movie_id)->first();
        return response()->json($seats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'movie_id' => 'required|string',
            'seat_array' => 'required|array',
            'seat_array.*' => 'required|numeric'
        ]);
        
        // Create a new seats record
        $seats = Seats::create([
            'movie_id' => $validatedData['movie_id'],
            'seat_array' =>json_encode($validatedData['seat_array']),
        ]);

        // Return a JSON response with the created seats data
        return response()->json($seats, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($movie_id, Request $request)
    {
        $seats = Seats::where('movie_id', $movie_id)->first();

        if (!$seats) {
            return response()->json(['error' => 'Seats not found'], 404);
        }

        $seatArray = $request->input('seat_array');
        $seats->seat_array = $seatArray;
        $seats->save();

        return response()->json(['message' => 'Seats updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
