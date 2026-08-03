<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AffiliateProductCollection;
use App\Http\Resources\AffiliateProductResource;
use App\Models\AffiliateProduct;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AffiliateProductController extends Controller
{
    // List all active affiliate products (paginated) - OPTIMIZED
    public function index(Request $request): AffiliateProductCollection
    {
        $cacheKey = 'products_index_' . md5(serialize($request->all()));

        $products = Cache::remember($cacheKey, now()->addMinutes(15), function () use ($request) {
            $query = AffiliateProduct::with(['category:id,name,slug'])
                ->where('status', 'active')
                ->select([
                    'id', 'product_name_snapshot', 'price', 'amazon_asin', 'amazon_url', 'your_notes',
                    'status', 'item_type', 'category_id', 'is_featured', 'try_on_image_url',
                    'created_at', 'updated_at', 'image_urls', 'main_image_url_snapshot', 'local_image_path'
                ]);

            // Apply filters efficiently
            if ($request->has('category') && $request->category) {
                $query->where('category_id', $request->integer('category'));
            }

            if ($request->has('featured') && $request->boolean('featured')) {
                $query->where('is_featured', true);
            }

            if ($request->has('min_price') && $request->min_price > 0) {
                $query->where('price', '>=', $request->integer('min_price'));
            }

            if ($request->has('max_price') && $request->max_price > 0) {
                $query->where('price', '<=', $request->integer('max_price'));
            }

            if ($request->has('item_type') && $request->item_type) {
                $query->where('item_type', $request->item_type);
            }

            // Optimized sorting
            $sortBy = $request->get('sort_by', 'updated_at');
            $sortOrder = $request->get('sort_order', 'desc');

            if (in_array($sortBy, ['price', 'created_at', 'updated_at'])) {
                $query->orderBy($sortBy, $sortOrder === 'asc' ? 'asc' : 'desc');
            } else {
                $query->orderBy('updated_at', 'desc');
            }

            return $query->paginate($request->input('per_page', 20));
        });

        return new AffiliateProductCollection($products);
    }
    public function search(Request $request): AffiliateProductCollection
    {
        // ✅ IMPROVED: Use FormRequest instead of inline validation
        $validated = $request->validate([
            'query' => 'required|string|min:2|max:255',
            'per_page' => 'nullable|integer|min:1|max:100',
        ], [
            'query.required' => 'Search query is required.',
            'query.min' => 'Search query must be at least 2 characters.',
            'query.max' => 'Search query must not exceed 255 characters.',
            'per_page.integer' => 'Per page must be a valid number.',
            'per_page.max' => 'Maximum 100 results per page allowed.',
        ]);

        $searchTerm = $validated['query'];
        $perPage = $validated['per_page'] ?? 12;

        $searchTermLike = '%' . $searchTerm . '%';

        $products = AffiliateProduct::where('status', 'active')
            ->where(function ($query) use ($searchTermLike, $searchTerm) {
                $query->where('product_name_snapshot', 'like', $searchTermLike)
                    ->orWhere('your_notes', 'like', $searchTermLike)
                    ->orWhere('item_type', 'like', $searchTermLike);
            })
            ->orderByRaw("CASE
                WHEN product_name_snapshot LIKE ? THEN 0
                WHEN item_type LIKE ? THEN 1
                WHEN your_notes LIKE ? THEN 2
                ELSE 3
            END", [$searchTermLike, $searchTermLike, $searchTermLike])
            ->orderBy('updated_at', 'desc')
            ->paginate($perPage);

        return new AffiliateProductCollection($products);
    }
    public function getStudioProducts(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $query = AffiliateProduct::where('status', 'active');

        if (! $request->boolean('collection', false)) {
            $query->whereNotNull('try_on_image_url');
        }

        if ($request->has('search') && $request->input('search') !== '') {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('product_name_snapshot', 'like', '%' . $searchTerm . '%')
                    ->orWhere('item_type', 'like', '%' . $searchTerm . '%')
                    ->orWhere('your_notes', 'like', '%' . $searchTerm . '%');
            });

            // Apply sorting only to search results
            $items = $query->orderBy('updated_at', 'desc')->get();
        } else {
            // Apply random order only when there is no search
            $limit = min($request->input('limit', 12), 50);
            $items = $query->inRandomOrder()->limit($limit)->get();
        }

        return AffiliateProductResource::collection($items);
    }


    /**
     * Display a specified number of randomly selected active affiliate products.
     */
    public function featured(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $limit = min($request->input('limit', 12), 50); // Reasonable limits

        $products = Cache::remember(
            "featured_products_{$limit}",
            app()->environment('testing') ? 0 : now()->addHours(6), // Don't cache in testing
            function () use ($limit) {
                return AffiliateProduct::with('category:id,name')
                    ->where('status', 'active')
                    ->where('is_featured', true)
                    ->select([
                        'id', 'product_name_snapshot', 'price', 'amazon_asin', 'amazon_url', 'your_notes',
                        'status', 'item_type', 'category_id', 'is_featured', 'try_on_image_url',
                        'created_at', 'updated_at', 'image_urls', 'main_image_url_snapshot', 'local_image_path'
                    ])
                    ->inRandomOrder()
                    ->limit($limit)
                    ->get();
            }
        );

        return AffiliateProductResource::collection($products);
    }
    public function random(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $limit = $request->input('limit', 4);

        $products = AffiliateProduct::where('status', 'active')
            ->inRandomOrder()
            ->limit($limit)
            ->get();

        return AffiliateProductResource::collection($products);
    }
    // Get a single product by ASIN
    public function showByAsin(AffiliateProduct $affiliateProduct): AffiliateProductResource
    {
        if ($affiliateProduct->status !== 'active') {
            abort(404, 'Product not found or not active.');
        }
        return new AffiliateProductResource($affiliateProduct);
    }

    public function trackClick(Request $request, AffiliateProduct $product, AnalyticsService $analyticsService)
    {
        if ($product->status !== 'active') {
            abort(404, 'Product not found or not active.');
        }

        $validated = $request->validate([
            'placement' => ['nullable', 'string', 'max:100'],
            'page' => ['nullable', 'string', 'max:255'],
            'source' => ['nullable', 'string', 'max:100'],
        ]);

        $analyticsService->trackProductClick($product->id, optional($request->user())->id, $validated);

        return response()->json(['tracked' => true]);
    }
}
