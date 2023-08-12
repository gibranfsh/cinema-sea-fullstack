<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seats = [];

        for ($i = 1; $i <= 31; $i++) {
            $seats[] = [
                'movie_id' => $i,
                'seat_array' => json_encode(array_fill(0, 64, 1)),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('seats')->insert($seats);
    }
}
