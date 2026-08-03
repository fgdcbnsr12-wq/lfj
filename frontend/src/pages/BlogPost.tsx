import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogLayout from '@/components/layout/BlogLayout';
import { usePost, usePosts } from '@/hooks/usePosts';
import { useContentContinuation } from '@/hooks/useContentContinuation';
import { Post as PostType, GetPostsParams } from '@/services/postService';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarDays as CalendarDaysIcon, Clock as ClockIcon, Tag as TagIcon, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, ArrowUp as ArrowUpIcon } from 'lucide-react';
import PostCardSkeleton from '@/components/ui/skeletons/PostCardSkeleton';
import { getPublicImageUrl } from '@/lib/imageUrl';
import SeoHead from '@/components/seo/SeoHead';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedPosts from '@/components/blog/RelatedPosts';

const SimplifiedPostCard: React.FC<{ post: PostType }> = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="group">
    <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      {post.featured_image_url && (
        <div className="aspect-[16/10] bg-gray-100 rounded-t-xl overflow-hidden">
          <img
            src={getPublicImageUrl(post.featured_image_url)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={1200}
            height={750}
           onError={(event) => { event.currentTarget.src = "/images/placeholder.svg"; }} />
        </div>
      )}
      <CardContent className="p-5 flex flex-col flex-grow">
        <h3 className="text-md font-playfair font-semibold mb-2 group-hover:text-primary-gold transition-colors line-clamp-2 leading-snug text-dark-slate">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{post.published_at_formatted}</p>
        <p className="text-gray-600 text-sm line-clamp-2 flex-grow">{post.excerpt}</p>
        <Button variant="link" size="sm" className="p-0 h-auto text-primary-gold self-start font-semibold group-hover:translate-x-1 transition-transform text-xs mt-auto">
          Read More <ArrowRightIcon size={14} className="ml-1" />
        </Button>
      </CardContent>
    </Card>
  </Link>
);

const BlogPostSkeleton: React.FC = () => (
  <BlogLayout>
    <article className="container max-w-3xl mx-auto px-4 py-12 animate-pulse">
      {/* Skeleton Layout */}
    </article>
  </BlogLayout>
);

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { markVisited } = useContentContinuation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const { data: post, isLoading, isError, error: postError } = usePost(slug);

  useEffect(() => {
    if (!post) {
      return;
    }

    markVisited({
      kind: 'blog',
      title: post.title,
      path: `/blog/${post.slug}`,
      slug: post.slug,
      subtitle: post.excerpt || 'Continue reading this story',
      imageUrl: post.featured_image_url || null,
      visitedAt: new Date().toISOString(),
    });
  }, [markVisited, post]);

  useEffect(() => {
    const onScroll = () => setShowScrollToTop(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const firstCategorySlug = post?.categories?.[0]?.slug;
    const relatedParams: GetPostsParams = {
      perPage: 3,
      categorySlug: firstCategorySlug,
      exclude: post?.id,
    };
  const { data: relatedPostsResponse, isLoading: relatedLoading } = usePosts(relatedParams, {
    enabled: !!post && !!firstCategorySlug,
  });

  const relatedPosts = relatedPostsResponse?.data || [];

  if (isLoading) return <BlogPostSkeleton />;

  if (isError || !post) {
    return (
      <BlogLayout>
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
          <h1 className="text-3xl font-bold font-playfair">Post Not Found</h1>
          <p className="text-muted-foreground mt-2">{(postError as Error)?.message || 'This post does not exist.'}</p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/blog"><ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Blog</Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }

  const textContent = (post.content_html || '').replace(/<[^>]*>?/gm, '');
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  const readingTime = post.seo?.reading_time || Math.max(1, Math.ceil(wordCount / 200));
  const heroImageUrl = post.featured_image_url ? getPublicImageUrl(post.featured_image_url) : undefined;
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    ...(post.categories?.[0] ? [{ label: post.categories[0].name, href: `/category/${post.categories[0].slug}` }] : []),
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <BlogLayout>
      <SeoHead seo={post.seo} breadcrumbs={breadcrumbs} heroImageUrl={heroImageUrl} />

      <article className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs crumbs={breadcrumbs} />
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary-gold">
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>

        <header className="mb-8 md:mb-10">
          {post.categories?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.categories.map(cat => (
                <Link to={`/category/${cat.slug}`} key={cat.id}>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">{cat.name}</Badge>
                </Link>
              ))}
            </div>
          )}
          <h1 className="text-4xl font-playfair font-bold text-dark-slate mb-4 leading-tight">{post.title}</h1>
          {post.excerpt && <p className="text-lg text-muted-foreground mt-2 mb-6 font-lato">{post.excerpt}</p>}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
            {post.author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 ring-1 ring-gray-200">
                  <AvatarImage src={undefined} alt={post.author.name} />
                  <AvatarFallback className="bg-gray-200 text-gray-700">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span>By <span className="font-medium text-dark-slate">{post.author.name}</span></span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <CalendarDaysIcon className="h-4 w-4" />
              <time dateTime={post.published_at_iso || undefined}>{post.published_at_formatted}</time>
            </div>
            {post.updated_at_iso && post.updated_at_iso !== post.published_at_iso && (
              <div className="flex items-center gap-1.5">
                <span>Updated</span>
                <time dateTime={post.updated_at_iso}>{new Date(post.updated_at_iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {post.featured_image_url ? (
          <figure className="my-8 md:my-10 rounded-xl overflow-hidden shadow-lg">
            <img
              src={getPublicImageUrl(post.featured_image_url)}
              alt={`${post.title} featured image`}
              className="w-full h-auto object-cover aspect-[16/9]"
              loading="eager"
              fetchPriority="high"
              width={1200}
              height={675}
             onError={(event) => { event.currentTarget.src = "/images/placeholder.svg"; }} />
          </figure>
        ) : (
          <figure className="my-8 md:my-10 rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/placeholder.svg"
              alt=""
              className="w-full h-auto object-cover aspect-[16/9]"
              loading="lazy"
              width={1200}
              height={675}
             onError={(event) => { event.currentTarget.src = "/images/placeholder.svg"; }} />
          </figure>
        )}

        <div className="blog-content break-words" dangerouslySetInnerHTML={{ __html: post.content_html }} />

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <TagIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold text-sm text-muted-foreground mr-2">TAGS:</span>
              {post.tags.map(tag => (
                <Link to={`/tag/${tag.slug}`} key={tag.id}>
                  <Badge variant="outline" className="hover:bg-gray-100">{tag.name}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {post.author && (
          <div className="mt-12 pt-8 border-t border-gray-200 bg-soft-cream p-6 md:p-8 rounded-xl shadow">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-primary-gold/30">
                <AvatarImage src={undefined} alt={post.author.name} />
                <AvatarFallback className="text-xl bg-gray-200 text-gray-700">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Written By</p>
                <h3 className="text-xl md:text-2xl font-semibold font-playfair text-dark-slate mt-1">
                  <span className="hover:text-primary-gold">{post.author.name}</span>
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  A passionate writer and jewellery enthusiast at LatestFashionJewellery.com, dedicated to bringing you the most sparkling content.
                </p>
              </div>
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-dark-slate mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <SimplifiedPostCard key={related.id} post={related} />
              ))}
            </div>
          </section>
        )}

        <RelatedPosts tag={post.tags?.[0]?.slug} exclude={post.slug} />

        {relatedLoading && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <Skeleton className="h-7 w-40 mb-8 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {showScrollToTop && (
          <div className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 items-center justify-between gap-2 rounded-full border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur md:hidden">
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/blog">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Blog
              </Link>
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ArrowUpIcon className="mr-2 h-4 w-4" />
              Top
            </Button>
          </div>
        )}
      </article>
    </BlogLayout>
  );
};

export default BlogPostPage;
