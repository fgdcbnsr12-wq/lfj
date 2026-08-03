<?php

namespace App\Domain\Pricing\ValueObjects;

use App\Domain\Pricing\Exceptions\InvalidPurityException;

final class Purity
{
    private float $percentage;

    private ?string $grade;

    private const COMMON_GRADES = [
        '999' => 99.9,
        '995' => 99.5,
        '990' => 99.0,
        '925' => 92.5, // Sterling silver
        '900' => 90.0,
        '875' => 87.5,
        '800' => 80.0,
        '750' => 75.0, // 18K gold
        '720' => 72.0,
        '585' => 58.5, // 14K gold
        '417' => 41.7, // 10K gold
        '375' => 37.5, // 9K gold
    ];

    private const KARAT_LABELS = [
        '24k' => 99.9,
        '22k' => 91.7,
        '21k' => 87.5,
        '20k' => 83.3,
        '18k' => 75.0,
        '17k' => 70.8,
        '16k' => 66.7,
        '15k' => 62.5,
        '14k' => 58.3,
        '12k' => 50.0,
        '10k' => 41.7,
        '9k' => 37.5,
    ];

    public function __construct(float $percentage, ?string $grade = null)
    {
        if ($percentage < 0 || $percentage > 100) {
            throw InvalidPurityException::outOfRange($percentage);
        }

        $this->percentage = round($percentage, 2);
        $this->grade = $grade;
    }

    public static function fromGrade(string $grade): self
    {
        $normalized = strtolower(trim($grade));

        if (isset(self::COMMON_GRADES[$normalized])) {
            return new self(self::COMMON_GRADES[$normalized], $normalized);
        }

        if (isset(self::KARAT_LABELS[$normalized])) {
            return new self(self::KARAT_LABELS[$normalized], $normalized);
        }

        if (preg_match('/^([0-9]{1,2})k$/i', $normalized, $matches) === 1) {
            $percentage = (int) $matches[1] / 24 * 100;

            return new self(round($percentage, 2), $normalized);
        }

        throw InvalidPurityException::unsupported($grade);
    }

    public function percentage(): float
    {
        return $this->percentage;
    }

    public function grade(): ?string
    {
        return $this->grade;
    }

    public function pureWeight(MetalWeight $totalWeight): MetalWeight
    {
        $pureGrams = $totalWeight->grams() * ($this->percentage / 100);

        return new MetalWeight($pureGrams);
    }

    public function wastePercentage(): float
    {
        return 100 - $this->percentage;
    }

    public function toString(): string
    {
        if ($this->grade) {
            return sprintf('%s (%d%%)', $this->grade, (int) $this->percentage);
        }

        return sprintf('%.2f%%', $this->percentage);
    }

    public function __toString(): string
    {
        return $this->toString();
    }
}
