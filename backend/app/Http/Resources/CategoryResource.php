<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Services\SeoService;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'image' => $this->image
                ? (Str::startsWith($this->image, ['http://', 'https://']) ? $this->image : Storage::disk('public')->url($this->image))
                : (Storage::disk('public')->exists("categories/{$this->slug}.jpg")
                    ? Storage::disk('public')->url("categories/{$this->slug}.jpg")
                    : url('/images/category-placeholder.png')),

            // THIS IS THE FIX: Add 'productCount' and remove 'posts_count'
            'productCount' => $this->when(isset($this->productCount), $this->productCount, 0),

            // Remove or comment out the old posts_count
            // 'posts_count' => $this->whenCounted('posts'),

            'seo' => app(SeoService::class)->forCategory($this->resource),
        ];
    }
}
