<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

/**
 * Class DatabaseSeeder.
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client::factory()
            ->count(500)
            ->create();
    }
}
