<?php

namespace App\Domain\Pricing\DTOs;

use App\Domain\Pricing\ValueObjects\Money;

class JewelryQuoteDTO
{
    public function __construct(
        public readonly Money $metalCost,
        public readonly Money $fabricationCost,
        public readonly Money $laborCost,
        public readonly Money $gemstoneCost,
        public readonly Money $markupAmount,
        public readonly Money $subtotal,
        public readonly Money $taxAmount,
        public readonly Money $finalPrice,
        public readonly array $breakdown = [],
        public readonly array $debugSteps = [],
    ) {}

    public function withDebugSteps(array $debugSteps): self
    {
        return new self(
            metalCost: $this->metalCost,
            fabricationCost: $this->fabricationCost,
            laborCost: $this->laborCost,
            gemstoneCost: $this->gemstoneCost,
            markupAmount: $this->markupAmount,
            subtotal: $this->subtotal,
            taxAmount: $this->taxAmount,
            finalPrice: $this->finalPrice,
            breakdown: $this->breakdown,
            debugSteps: $debugSteps,
        );
    }

    public function toArray(): array
    {
        return [
            'metal_cost' => $this->metalCost->amount(),
            'fabrication_cost' => $this->fabricationCost->amount(),
            'labor_cost' => $this->laborCost->amount(),
            'gemstone_cost' => $this->gemstoneCost->amount(),
            'markup_amount' => $this->markupAmount->amount(),
            'markup' => $this->markupAmount->amount(),
            'subtotal' => $this->subtotal->amount(),
            'tax_amount' => $this->taxAmount->amount(),
            'tax' => $this->taxAmount->amount(),
            'final_price' => $this->finalPrice->amount(),
            'metal_price' => $this->metalCost->amount(),
            'total' => $this->finalPrice->amount(),
            'currency' => $this->finalPrice->currency(),
            'breakdown' => $this->breakdown,
            'debug_steps' => $this->debugSteps,
        ];
    }
}
