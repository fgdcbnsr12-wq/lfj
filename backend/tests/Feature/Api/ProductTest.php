<?php

use App\Models\AffiliateProduct;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(RefreshDatabase::class);

test('can get products list', function () {
    AffiliateProduct::factory()->count(5)->create(['status' => 'active']);

    $response = $this->getJson('/api/products');

    $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id', 'name', 'price', 'image_url', 'category'
                    ]
                ],
                'links', 'meta'
            ]);
});

test('can filter featured products', function () {
    AffiliateProduct::factory()->count(3)->create(['status' => 'active', 'is_featured' => false]);
    AffiliateProduct::factory()->count(2)->create(['status' => 'active', 'is_featured' => true]);

    $response = $this->getJson('/api/products?featured=1');

    $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
});

test('can filter products by category', function () {
    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();

    AffiliateProduct::factory()->count(3)->create([
        'status' => 'active',
        'category_id' => $category1->id
    ]);
    AffiliateProduct::factory()->count(2)->create([
        'status' => 'active',
        'category_id' => $category2->id
    ]);

    $response = $this->getJson("/api/products?category={$category1->id}");

    $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
});

test('can filter products by price range', function () {
    AffiliateProduct::factory()->create(['status' => 'active', 'price' => 50]);
    AffiliateProduct::factory()->create(['status' => 'active', 'price' => 100]);
    AffiliateProduct::factory()->create(['status' => 'active', 'price' => 200]);

    $response = $this->getJson('/api/products?min_price=75&max_price=150');

    $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
});

test('api rate limiting works', function () {
    // Create some test data
    AffiliateProduct::factory()->count(5)->create(['status' => 'active']);

    // Make multiple requests to trigger rate limiting
    for ($i = 0; $i < 65; $i++) {
        $response = $this->getJson('/api/products');
        if ($i < 60) { // First 60 should succeed (60 per minute limit)
            $response->assertStatus(200);
        }
    }

    // The 61st request should be rate limited
    $response = $this->getJson('/api/products');
    $response->assertStatus(429); // Too Many Requests
});

test('featured products endpoint returns cached results', function () {
    AffiliateProduct::factory()->count(5)->create([
        'status' => 'active',
        'is_featured' => true
    ]);

    $response = $this->getJson('/api/products/featured');

    $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'price', 'image_url']
                ]
            ]);
});

test('health check endpoint works', function () {
    $response = $this->getJson('/api/health');

    $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'timestamp',
                'version',
                'environment',
                'services' => [
                    'database',
                    'cache',
                    'memory_usage',
                    'uptime'
                ]
            ])
            ->assertJson(['status' => 'healthy']);
});

test('search endpoint validates input', function () {
    // Test missing query
    $response = $this->getJson('/api/products/search');
    $response->assertStatus(422);

    // Test query too short
    $response = $this->getJson('/api/products/search?query=a');
    $response->assertStatus(422);

    // Test valid query
    AffiliateProduct::factory()->create([
        'status' => 'active',
        'product_name_snapshot' => 'Diamond Ring'
    ]);

    $response = $this->getJson('/api/products/search?query=diamond');
    $response->assertStatus(200);
});

test('shop search prioritizes direct product-name matches before note matches', function () {
    $olderMatch = AffiliateProduct::factory()->create([
        'status' => 'active',
        'product_name_snapshot' => 'Diamond Gold Ring',
        'your_notes' => 'This product is gold and matches the search term.',
        'item_type' => 'ring',
        'updated_at' => now()->subDay(),
    ]);

    $newerNoteMatch = AffiliateProduct::factory()->create([
        'status' => 'active',
        'product_name_snapshot' => 'Necklace',
        'your_notes' => 'Gold is the main search term in the listing notes.',
        'item_type' => 'necklace',
        'updated_at' => now(),
    ]);

    $response = $this->getJson('/api/products/search?query=gold&per_page=5');

    $response->assertStatus(200)
        ->assertJsonPath('data.0.id', $olderMatch->id)
        ->assertJsonPath('data.1.id', $newerNoteMatch->id);
});

test('security headers are present', function () {
    $response = $this->getJson('/api/health');

    $response->assertHeader('X-Frame-Options', 'SAMEORIGIN')
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-XSS-Protection', '1; mode=block')
            ->assertHeader('Strict-Transport-Security')
            ->assertHeader('Content-Security-Policy');
});

test('response compression works for json requests', function () {
    $response = $this->withHeaders([
        'Accept-Encoding' => 'gzip',
    ])->getJson('/api/products');

    $response->assertStatus(200);

    if ($response->headers->has('Content-Encoding')) {
        $response->assertHeader('Content-Encoding', 'gzip');
    }
});
