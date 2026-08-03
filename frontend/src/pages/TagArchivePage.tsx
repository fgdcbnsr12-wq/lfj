import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BlogLayout from '@/components/layout/BlogLayout';
import SimplifiedPostCard from '@/components/blog/SimplifiedPostCard';
import PostCardSkeleton from '@/components/blog/PostCardSkeleton';
import SeoHead from '@/components/seo/SeoHead';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { buildArchivePageStateDescription, buildCanonicalPath } from '@/lib/seo';
import EmptyState from '@/components/ui/EmptyState';
import { api } from '@/lib/apiClient';
import { usePosts } from '@/hooks/usePosts';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

const TagArchivePage: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { data: tag, isLoading, isError } = useQuery({
    queryKey: ['tag', tagSlug],
    queryFn: () => api.get(`/tags/${tagSlug}`),
    enabled: Boolean(tagSlug),
  });
  const { data: postsResponse, isLoading: postsLoading } = usePosts(
    { tag: tagSlug, perPage: 9 },
    { enabled: Boolean(tagSlug) }
  );

  if (isLoading) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => <PostCardSkeleton key={index} />)}
        </div>
      </BlogLayout>
    );
  }

  if (isError || !tag) {
    return (
      <BlogLayout>
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
          <h1 className="text-3xl font-bold font-playfair">Tag Not Found</h1>
          <p className="mt-2 text-muted-foreground">The tag you are looking for does not exist.</p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }

  const canonicalPath = buildCanonicalPath(`/tag/${tag.slug}`, currentPage);
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tags', href: '/tags' },
    { label: tag.name, href: canonicalPath },
  ];

  const archiveSeo = {
    ...tag.seo,
    title: tag.seo?.title || `${tag.name} | Latest Fashion Jewellery`,
    meta_description:
      tag.seo?.meta_description ||
      buildArchivePageStateDescription({
        name: tag.name,
        page: currentPage,
        fallbackDescription: `Discover ${tag.name} stories, articles, and editorial content on Latest Fashion Jewellery.`,
      }),
    canonical: canonicalPath,
    robots: 'index,follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: tag.name,
      description: tag.description || `Explore ${tag.name} content and related articles.`,
      url: canonicalPath,
      mainEntity: {
        '@type': 'ItemList',
        name: tag.name,
      },
    },
  };

  return (
    <BlogLayout>
      <SeoHead seo={archiveSeo} breadcrumbs={crumbs} />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs crumbs={crumbs} />
        <header className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-gold uppercase tracking-wider mb-2">Tag</p>
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-dark-slate">{tag.name}</h1>
        </header>

        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => <PostCardSkeleton key={index} />)}
          </div>
        ) : postsResponse?.data?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {postsResponse.data.map((post) => <SimplifiedPostCard key={post.id} post={post} />)}
          </div>
        ) : (
          <EmptyState
            icon={Search}
            title="No posts found"
            description={`There are no posts with the “${tag.name}” tag yet. Try another tag or revisit later.`}
            className="mt-4"
          />
        )}
      </div>
    </BlogLayout>
  );
};

export default TagArchivePage;
