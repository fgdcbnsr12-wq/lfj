<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str; // For Str::limit
use Illuminate\Support\Facades\Storage;
use App\Services\SeoService;
use App\Http\Resources\UserResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\TagResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content_html' => (string) $this->content,
            'excerpt' => (string) $this->excerpt,
            'featured_image_url' => $this->resolveFeaturedImageUrl(),
            'status' => $this->status,
            'published_at_iso' => $this->published_at ? $this->published_at->toIso8601String() : null,
            'published_at_formatted' => $this->published_at ? $this->published_at->format('F j, Y') : 'Not Published',
            'reading_time' => $this->reading_time,
            'author' => $this->user ? new UserResource($this->user) : null,
            'categories' => CategoryResource::collection($this->categories),
            'tags' => TagResource::collection($this->tags),
            'seo' => app(SeoService::class)->forPost($this->resource),
            'created_at_human' => $this->created_at->diffForHumans(),
            'updated_at_iso' => $this->updated_at->toIso8601String(),
        ];
    }

    private function resolveFeaturedImageUrl(): ?string
    {
        if ($this->featured_image) {
            return Storage::disk('public')->url($this->featured_image);
        }

        if ($this->featured_image_url_snapshot) {
            return Str::startsWith($this->featured_image_url_snapshot, ['http://', 'https://', '//'])
                ? $this->featured_image_url_snapshot
                : Storage::disk('public')->url(ltrim($this->featured_image_url_snapshot, '/'));
        }

        $fallbackPath = "post-featured-images/{$this->id}.jpg";

        return Storage::disk('public')->exists($fallbackPath)
            ? Storage::disk('public')->url($fallbackPath)
            : null;
    }
}
