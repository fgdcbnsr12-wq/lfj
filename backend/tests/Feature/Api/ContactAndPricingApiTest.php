<?php

use App\Domain\Pricing\DTOs\MetalPriceDTO;
use App\Domain\Pricing\ValueObjects\Money;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;

uses(RefreshDatabase::class);

beforeEach(function () {
    Cache::forget('pricing:metal:XAU:USD:latest');
    Cache::put(
        'pricing:metal:XAU:USD:latest',
        new MetalPriceDTO(
            metalSymbol: 'XAU',
            pricePerUnit: new Money(2100.0, 'USD'),
            baseCurrency: 'USD',
            unit: 'ounce',
            recordedAt: now(),
            source: 'test-fixture',
        ),
        now()->addMinutes(360)
    );
});

test('contact submissions endpoint validates and stores a valid message', function () {
    $payload = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'subject' => 'Wholesale inquiry',
        'message' => 'I would like a custom pricing estimate for a necklace set.',
    ];

    $invalidResponse = $this->postJson('/api/contact-submissions', [
        'name' => 'J',
        'email' => 'bad-email',
        'subject' => 'Hi',
        'message' => 'short',
    ]);

    $invalidResponse->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'email', 'subject', 'message']);

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(201)
        ->assertJson(['message' => 'Message sent successfully. We will follow up shortly.']);

    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'subject' => 'Wholesale inquiry',
        'status' => 'new',
    ]);
});

test('contact submissions reject honeypot bot input', function () {
    $response = $this->postJson('/api/contact-submissions', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'subject' => 'Wholesale inquiry',
        'message' => 'I would like a custom pricing estimate for a necklace set.',
        'website' => 'https://spam.example',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['website']);
});

test('pricing quote endpoint returns quote payload with version metadata', function () {
    $payload = [
        'metal_symbol' => 'XAU',
        'weight_grams' => 12.5,
        'purity_grade' => '24K',
        'fabrication_cost' => 20,
        'labor_cost' => 15,
        'gemstone_cost' => 10,
        'markup_percentage' => 10,
        'tax_rate' => 5,
        'currency' => 'USD',
    ];

    $response = $this->postJson('/api/pricing/jewelry/quote', $payload);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'pricing_version',
            'data' => [
                'final_price',
                'metal_price',
                'subtotal',
                'markup',
                'tax',
                'total',
            ],
        ])
        ->assertJsonPath('success', true);
});

test('pricing quote endpoint validates invalid payloads', function () {
    $response = $this->postJson('/api/pricing/jewelry/quote', [
        'metal_symbol' => '',
        'weight_grams' => 0,
        'purity_grade' => '',
        'fabrication_cost' => -1,
        'labor_cost' => -1,
        'gemstone_cost' => -1,
        'markup_percentage' => -1,
        'tax_rate' => -1,
        'currency' => 'US',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'metal_symbol',
            'weight_grams',
            'purity_grade',
            'fabrication_cost',
            'labor_cost',
            'gemstone_cost',
            'markup_percentage',
            'tax_rate',
            'currency',
        ]);
});

test('resale pricing endpoint returns structured result payload', function () {
    $response = $this->postJson('/api/pricing/resale/calculate', [
        'metal_symbol' => 'XAU',
        'weight_grams' => 10,
        'purity_grade' => '24K',
        'condition' => 'good',
        'buyback_percentage' => 85,
        'currency' => 'USD',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'pricing_version',
            'data' => [
                'buyback_price',
                'deductions',
                'net_price',
            ],
        ])
        ->assertJsonPath('success', true);
});
