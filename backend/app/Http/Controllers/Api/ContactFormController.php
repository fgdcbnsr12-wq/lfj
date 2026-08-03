<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ContactFormRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\ContactSubmission;
use App\Mail\ContactFormSubmitted;
use Illuminate\Http\JsonResponse;

class ContactFormController extends Controller
{
    public function store(ContactFormRequest $request): JsonResponse
    {
        // ✅ FIX: Use FormRequest for validation (auto-validates on controller injection)
        $validated = $request->validated();

        try {
            // Save to database
            $submission = ContactSubmission::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                'status' => 'new',
                'ip_address' => $request->ip(),
            ]);

            Log::info('Database submission successful. ID: ' . $submission->id);

            // --- TEMPORARILY COMMENT THIS OUT FOR THE TEST ---
            // Mail::to('your-admin-email@example.com')->send(new ContactFormSubmitted($submission));

            // Return a success response
            return response()->json(['message' => 'Message sent successfully. We will follow up shortly.'], 201);

        } catch (\Exception $e) {
            Log::error('Contact form submission failed: ' . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred.', 'error' => $e->getMessage()], 500);
        }
    }
}