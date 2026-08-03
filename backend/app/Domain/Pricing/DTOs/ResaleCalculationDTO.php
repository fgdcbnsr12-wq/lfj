<?php

namespace App\Domain\Pricing\DTOs;

use App\Domain\Pricing\ValueObjects\Money;

/**
 * @template T of ResaleCalculationDTO
 */
class ResaleCalculationDTO
{
    public function __construct(
        public readonly Money $originalPrice,
        public readonly Money $estimatedMarketValue,
        public readonly Money $buybackAmount,
        public readonly float $buybackPercentage,
        public readonly string $condition,
        public readonly array $deductions = [],
        public readonly array $debugSteps = [],
    ) {}

    public function withDebugSteps(array $debugSteps): static
    {
        return new static(
            originalPrice: $this->originalPrice,
            estimatedMarketValue: $this->estimatedMarketValue,
            buybackAmount: $this->buybackAmount,
            buybackPercentage: $this->buybackPercentage,
            condition: $this->condition,
            deductions: $this->deductions,
            debugSteps: $debugSteps,
        );
    }

    public function toArray(): array
    {
        return [
            'original_price' => $this->originalPrice->amount(),
            'estimated_market_value' => $this->estimatedMarketValue->amount(),
            'buyback_amount' => $this->buybackAmount->amount(),
            'buyback_price' => $this->buybackAmount->amount(),
            'net_price' => $this->buybackAmount->amount(),
            'buyback_percentage' => $this->buybackPercentage,
            'condition' => $this->condition,
            'deductions' => $this->deductions,
            'currency' => $this->originalPrice->currency(),
            'debug_steps' => $this->debugSteps,
        ];
    }
}
