<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'numero' => $this->faker->randomNumber(),
            'quantity' => $this->faker->randomNumber(),
            'reste' => $this->faker->randomNumber(),
            'creator_id' => $this->faker->randomNumber(),
        ];
    }
}
