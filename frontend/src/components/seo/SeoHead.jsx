import React from 'react';
import { Helmet } from 'react-helmet-async';

const defaultSeo = {
  title: 'Latest Fashion Jewellery',
  meta_description: 'Jewellery guides, trends, events, videos, tools, and curated product inspiration.',
  keywords: '',
  canonical: typeof window !== 'undefined' ? window.location.href : '',
  robots: 'index,follow',
  og: {},
  twitter: {},
  schema: [],
  site_name: 'Latest Fashion Jewellery',
  twitter_handle: '@latestfashionjewellery',
  theme_color: '#b88a44',
};

const buildBreadcrumbSchema = (breadcrumbs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label || crumb.name,
    item: crumb.href || crumb.url,
  })),
});

const toAbsoluteCanonical = (canonicalValue) => {
  if (!canonicalValue) return typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';

  if (canonicalValue.startsWith('http')) {
    return canonicalValue;
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${canonicalValue}`;
};

const SeoHead = ({ seo, breadcrumbs, heroImageUrl }) => {
  const data = { ...defaultSeo, ...(seo || {}) };
  const og = { ...defaultSeo.og, ...(data.og || {}) };
  const twitter = { ...defaultSeo.twitter, ...(data.twitter || {}) };
  const canonical = toAbsoluteCanonical(data.canonical || (typeof window !== 'undefined' ? window.location.pathname : ''));
  const schemas = Array.isArray(data.schema)
    ? data.schema
    : data.schema
    ? [data.schema]
    : [];

  const finalSchemas = schemas.length
    ? schemas
    : [{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.meta_description || defaultSeo.meta_description,
        url: canonical,
        publisher: {
          '@type': 'Organization',
          name: defaultSeo.site_name,
        },
      }];

  return (
    <Helmet>
      <html lang="en" />
      <title>{data.title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={data.meta_description || defaultSeo.meta_description} />
      {data.keywords ? <meta name="keywords" content={data.keywords} /> : null}
      <meta name="robots" content={data.robots || 'index,follow'} />
      <meta name="theme-color" content={data.theme_color || defaultSeo.theme_color} />
      <link rel="canonical" href={canonical} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://img.youtube.com" />
      <link rel="preconnect" href="https://m.media-amazon.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//img.youtube.com" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      {heroImageUrl ? <link rel="preload" as="image" href={heroImageUrl} fetchpriority="high" /> : null}

      <meta property="og:title" content={og.title || data.title} />
      <meta property="og:description" content={og.description || data.meta_description} />
      {og.image ? <meta property="og:image" content={og.image} /> : null}
      <meta property="og:type" content={og.type || 'website'} />
      <meta property="og:url" content={og.url || canonical} />
      <meta property="og:site_name" content={data.site_name || defaultSeo.site_name} />

      <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
      <meta name="twitter:title" content={twitter.title || data.title} />
      <meta name="twitter:description" content={twitter.description || data.meta_description} />
      {twitter.image ? <meta name="twitter:image" content={twitter.image} /> : null}
      <meta name="twitter:site" content={data.twitter_handle || defaultSeo.twitter_handle} />

      {finalSchemas.map((schemaObject, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schemaObject)}
        </script>
      ))}
      {breadcrumbs?.length ? (
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}
        </script>
      ) : null}
    </Helmet>
  );
};

export default SeoHead;
