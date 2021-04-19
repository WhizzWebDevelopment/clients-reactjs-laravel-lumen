<?php
declare(strict_types=1);

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Class ClientFactory.
 */
class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $membershipTypes = ['Silver', 'Gold', 'Platinum'];

        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'phone_number' => $this->faker->phoneNumber,
            'membership_type' => $membershipTypes[rand(0, 2)],
            'membership_expiry_date' => $this->faker->date('Y-m-d', '2030-12-31'),
            'address' => $this->faker->address,
            'mailing_address' => $this->faker->address
        ];
    }
}
