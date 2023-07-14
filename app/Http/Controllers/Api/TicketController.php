<?php

namespace App\Http\Controllers\Api;

use App\Models\Ticket;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required',
            'date' => 'required',
            'time' => 'required',
            'seats' => 'required|array',
            'total_price' => 'required|numeric',
        ]);

        // Convert the seats array to a JSON string
        $seats = json_encode($validatedData['seats']);

        // Create a new ticket
        $ticket = Ticket::create([
            'user_id' => $validatedData['user_id'],
            'movie_id' => $validatedData['movie_id'],
            'date' => $validatedData['date'],
            'time' => $validatedData['time'],
            'seats' => $seats,
            'total_price' => $validatedData['total_price'],
        ]);

        // Return a JSON response with the created ticket data
        return response()->json($ticket, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Get tickets by user ID.
     */

    public function getByUserId($userId)
    {
        $tickets = Ticket::where('user_id', $userId)->get();

        return response()->json($tickets);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully']);
    }
}
