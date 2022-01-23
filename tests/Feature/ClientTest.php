<?php

namespace Tests\Feature;

use Faker\Factory;
use Tests\TestCase;
use Illuminate\Http\Response;

class ClientTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $faker = Factory::create();
        $this->name = $faker->name;
        $this->gender = $faker->randomElement(['male', 'female', 'other']);
        $this->phone = $faker->phoneNumber;
        $this->email = $faker->email;
        $this->nationality = $faker->country;
        $this->address = $faker->Address;
        $this->education = $faker->text;
        $this->dob = date('2014-02-25');
        $this->mode_of_contact = $faker->randomElement(['email', 'phone', 'none']);
    }


    public function testClientGet()
    {
        $response = $this->getJson('/api/client');


        $response->assertStatus(200);
    }


    public function testClientPost()
    {
        $response = $this->postJson('/api/client/store', [
            'name' => $this->name,
            'gender' => $this->gender,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'nationality' => $this->nationality,
            'dob' => $this->dob,
            'education' => $this->education,
            'mode_of_contact' => $this->mode_of_contact
        ]);


        $response->assertStatus(200)
            ->assertExactJson([
                'message' => "Data saved Successfully",
            ]);
        ;
    }


    public function request_should_fail_when_no_name_is_provided()
    {
        $response = $this->postJson('/api/client/store', [
            'name' => '',
            'gender' => $this->gender,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'nationality' => $this->nationality,
            'dob' => $this->dob,
            'education' => $this->education,
            'mode_of_contact' => $this->mode_of_contact
        ]);

        $response->assertStatus(
            Response::HTTP_UNPROCESSABLE_ENTITY
        );

        $response->assertJsonValidationErrors('name');
    }


    public function request_should_fail_when_email_is_invalid()
    {
        $response = $this->postJson('/api/client/store', [
            'name' => $this->name,
            'gender' => $this->gender,
            'phone' => $this->phone,
            'email' => 'avvvvvvv@@gggg',
            'address' => $this->address,
            'nationality' => $this->nationality,
            'dob' => $this->dob,
            'education' => $this->education,
            'mode_of_contact' => $this->mode_of_contact
        ]);
        $response->assertStatus(
            Response::HTTP_UNPROCESSABLE_ENTITY
        );

        $response->assertJsonValidationErrors('email');
    }
}
