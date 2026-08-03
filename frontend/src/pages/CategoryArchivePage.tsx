import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Layout and Reusable Components
import BlogLayout from '@/components/layout/BlogLayout';
import PostCardSkeleton from '@/components/blog/PostCardSkeleton';
import SimplifiedPostCard from '@/components/blog/SimplifiedPostCard';
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft as ArrowLeftIcon, Search } from 'lucide-react';

// Services and Hooks - Assuming these are correctly set up now
import { usePosts } from '@/hooks/usePosts';
import { useCategory } from '@/hooks/useCategories';
import { GetPostsParams } from '@/services/postService';
import SeoHead from '@/components/seo/SeoHead';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { buildArchivePageStateDescription, buildCanonicalPath } from '@/lib/seo';
import EmptyState from '@/components/ui/EmptyState';

const CategoryArchivePage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // 1. Fetch the specific category's details first
  const { data: category, isLoading: isCategoryLoading, isError: isCategoryError } = useCategory(categorySlug);

  // 2. Fetch the posts for this category, but only if the category was successfully loaded
  const postParams: GetPostsParams = {
    page: currentPage,
    perPage: 9,
    categorySlug: categorySlug,
  };
  const { data: postsResponse, isLoading: arePostsLoading } = usePosts(
    postParams,
    { enabled: !!category } // only run this query if 'category' exists
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // --- RENDER LOGIC ---

  // Main loading state (while fetching category details)
  if (isCategoryLoading) {
    return (
      <BlogLayout>
        <div className="container mx-auto py-12 px-4">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-5 w-3/4 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => <PostCardSkeleton key={index} />)}
          </div>
        </div>
      </BlogLayout>
    );
  }

  // Error state (if category not found)
  if (isCategoryError || !category) {
    return (
      <BlogLayout>
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
          <h1 className="text-3xl font-bold font-playfair">Category Not Found</h1>
          <p className="mt-2 text-muted-foreground">The category you are looking for does not exist.</p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/blog"><ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Blog</Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }

  const canonicalPath = buildCanonicalPath(`/category/${category.slug}`, currentPage);
  const archiveSeo = {
    ...category.seo,
    title: category.seo?.title || `${category.name} | Latest Fashion Jewellery`,
    meta_description:
      category.seo?.meta_description ||
      buildArchivePageStateDescription({
        name: category.name,
        page: currentPage,
        fallbackDescription: `Browse ${category.name} articles and editorial content on Latest Fashion Jewellery.`,
      }),
    canonical: canonicalPath,
    robots: 'index,follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: category.name,
      description: category.description || `Explore ${category.name} posts and editorial content.`,
      url: canonicalPath,
      mainEntity: {
        '@type': 'ItemList',
        name: category.name,
      },
    },
  };

  // Success state (category found, now render posts)
  return (
    <BlogLayout>
      <SeoHead
        seo={archiveSeo}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: category.name, href: canonicalPath },
        ]}
      />
      
      <div className="bg-soft-cream">
        <div className="container mx-auto px-4 py-16 text-center">
            <Breadcrumbs crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: category.name, href: canonicalPath },
            ]} />
            <p className="text-sm font-semibold text-primary-gold uppercase tracking-wider mb-2">Category</p>
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-dark-slate">{category.name}</h1>
            {category.description && (
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{category.description}</p>
            )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Posts Grid Section */}
        {arePostsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => <PostCardSkeleton key={index} />)}
            </div>
        ) : postsResponse?.data && postsResponse.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {postsResponse.data.map((post) => (
                <SimplifiedPostCard key={post.id} post={post} />
              ))}
            </div>
            {/* Pagination for Posts */}
            {postsResponse.meta && postsResponse.meta.last_page > 1 && (
              <div className="mt-16">
                <Pagination>
                  <PaginationContent>
                    {/* Previous Button */}
                    {postsResponse.meta.current_page > 1 && (
                      <PaginationItem><PaginationPrevious className="cursor-pointer" onClick={() => handlePageChange(postsResponse.meta.current_page - 1)} /></PaginationItem>
                    )}
                    {/* Page Numbers (simplified logic) */}
                    <PaginationItem><PaginationLink isActive>{postsResponse.meta.current_page}</PaginationLink></PaginationItem>
                    {/* Next Button */}
                    {postsResponse.meta.current_page < postsResponse.meta.last_page && (
                      <PaginationItem><PaginationNext className="cursor-pointer" onClick={() => handlePageChange(postsResponse.meta.current_page + 1)} /></PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={Search}
            title="No posts found"
            description={`There are no posts in the “${category.name}” category yet. Try another category or revisit later.`}
            className="mt-4"
          />
        )}
      </div>
    </BlogLayout>
  );
};

export default CategoryArchivePage;
