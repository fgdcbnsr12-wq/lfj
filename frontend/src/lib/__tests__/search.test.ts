import { describe, expect, it } from 'vitest';
import { hasMeaningfulSearchQuery, normalizeSearchQuery } from '../search';

describe('search helpers', () => {
  it('normalizes whitespace and casing for consistent matching', () => {
    expect(normalizeSearchQuery('  Gold   Necklaces  ')).toBe('gold necklaces');
    expect(normalizeSearchQuery('EARRINGS')).toBe('earrings');
  });

  it('treats short searches as not meaningful', () => {
    expect(hasMeaningfulSearchQuery('g')).toBe(false);
    expect(hasMeaningfulSearchQuery('go')).toBe(false);
    expect(hasMeaningfulSearchQuery('gold')).toBe(true);
  });
});
