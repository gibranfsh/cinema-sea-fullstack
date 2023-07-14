<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seats extends Model
{
    use HasFactory;

    protected $table = 'seats'; // Specify the table name

    protected $fillable = ['movie_id', 'seat_array']; // Define the fillable attributes
}
