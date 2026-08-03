import { describe, expect, it } from 'vitest';
import { buildArchivePageStateDescription, buildCanonicalPath } from '../seo';

describe('archive SEO helpers', () => {
  it('returns a base description for the first archive page', () => {
    const description = buildArchivePageStateDescription({
      name: 'Wedding Jewellery',
      page: 1,
      fallbackDescription: 'Browse Wedding Jewellery articles and editorial content.',
    });

    expect(description).toBe('Browse Wedding Jewellery articles and editorial content.');
  });

  it('includes page state for paginated archive pages', () => {
    const description = buildArchivePageStateDescription({
      name: 'Wedding Jewellery',
      page: 3,
      fallbackDescription: 'Browse Wedding Jewellery articles and editorial content.',
    });

    expect(description).toContain('Page 3');
    expect(description).toContain('Wedding Jewellery');
  });

  it('builds canonical paths for paginated archive routes', () => {
    expect(buildCanonicalPath('/category/wedding-jewellery', 1)).toBe('/category/wedding-jewellery');
    expect(buildCanonicalPath('/tag/bridal', 2)).toBe('/tag/bridal?page=2');
  });
});
