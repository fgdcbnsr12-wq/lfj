// src/pages/BlogHome.tsx
import React from "react";
import { useSearchParams } from "react-router-dom";

// --- Hooks and Services ---
import { Post as PostType } from "@/services/postService";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";

// --- UI Components ---
import PostCard from "@/components/blog/PostCard";
import PostCardSkeleton from "@/components/blog/PostCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmptyState from "@/components/ui/EmptyState";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { InfoIcon, RefreshCw, Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useSeo } from "@/hooks/useSeo";
import { hasMeaningfulSearchQuery, normalizeSearchQuery } from "@/lib/search";

const POSTS_PER_PAGE = 9;

// ---------- helpers ----------
const toPositiveInt = (v: unknown, fallback = 1) => {
  const n = parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const parsePageParam = (sp: URLSearchParams) => {
  const raw = sp.get("page");
  if (!raw) return 1;
  // robustly extract first integer (avoids NaN, "1,11", etc.)
  const m = raw.match(/-?\d+/);
  if (!m) return 1;
  const n = parseInt(m[0], 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(n, max));

const BlogHome: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { seo } = useSeo("blog-index");

  // current page derived from URL (with safe parse)
  const [currentPage, setCurrentPage] = React.useState<number>(() =>
    parsePageParam(searchParams)
  );

  const selectedCategorySlug = searchParams.get("category");
  const searchQueryParam = searchParams.get("search") || "";
  const normalizedSearchQuery = normalizeSearchQuery(searchQueryParam);
  const hasActiveSearch = hasMeaningfulSearchQuery(searchQueryParam);

  // Categories
  const { data: categoriesResponse, isLoading: isLoadingCategories } =
    useCategories({ perPage: 100 });
  const categories = categoriesResponse?.data || [];

  // Posts
  const {
    data: postsResponse,
    isLoading: isLoadingPosts,
    isFetching,
    isError,
    refetch,
  } = usePosts({
    page: currentPage,
    perPage: POSTS_PER_PAGE,
    categorySlug: selectedCategorySlug,
    search: hasActiveSearch ? normalizedSearchQuery : undefined,
  });

  // keep state in sync with URL (and scroll to top)
  React.useEffect(() => {
    const newPage = parsePageParam(searchParams);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
     
  }, [searchParams.toString()]);

  // responsive sibling count
  const [siblingCount, setSiblingCount] = React.useState<number>(() => {
    if (typeof window === "undefined") return 2;
    return window.innerWidth < 640 ? 1 : 2; // mobile: 1, desktop: 2
  });
  React.useEffect(() => {
    const onResize = () => setSiblingCount(window.innerWidth < 640 ? 1 : 2);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handlePageChange = (page: number) => {
    const lastPage = toPositiveInt(postsResponse?.meta?.last_page, 1);
    const next = clamp(toPositiveInt(page, 1), 1, lastPage);
    // optimistic state update
    setCurrentPage(next);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(next));
    setSearchParams(newParams, { replace: true });
  };

  const handleCategorySelect = (slug: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) newParams.set("category", slug);
    else newParams.delete("category");
    newParams.set("page", "1");
    setCurrentPage(1);
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) newParams.set("search", value.trim());
    else newParams.delete("search");
    newParams.set("page", "1");
    setCurrentPage(1);
    setSearchParams(newParams, { replace: true });
  };

  const selectedCategoryName = React.useMemo(
    () =>
      selectedCategorySlug
        ? categories.find((c) => c.slug === selectedCategorySlug)?.name
        : null,
    [categories, selectedCategorySlug]
  );

  const hasActiveFilters = Boolean(selectedCategorySlug || searchQueryParam);

  // ---- pagination range (with ellipses) ----
  const range = (start: number, end: number) =>
    Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

  const getPaginationRange = (
    current: number,
    totalPages: number,
    siblings: number
  ): (number | "...")[] => {
    const totalNumbers = siblings * 2 + 5; // first, last, current, and two sibling ranges
    if (totalPages <= totalNumbers) {
      return range(1, totalPages);
    }

    const left = Math.max(current - siblings, 2);
    const right = Math.min(current + siblings, totalPages - 1);

    const items: (number | "...")[] = [1];

    if (left > 2) items.push("...");
    else for (let p = 2; p < left; p++) items.push(p);

    for (let p = left; p <= right; p++) items.push(p);

    if (right < totalPages - 1) items.push("...");
    else for (let p = right + 1; p <= totalPages - 1; p++) items.push(p);

    items.push(totalPages);
    return items;
  };

  // build proper href for anchors (keeps category etc.)
  const buildHref = React.useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(page));
      const base =
        typeof window !== "undefined" ? window.location.pathname : "/blog";
      return `${base}?${params.toString()}`;
    },
    [searchParams]
  );

  const renderPagination = () => {
    const meta = postsResponse?.meta;
    if (!meta) return null;

    const lastPage = toPositiveInt(meta.last_page, 1);
    const cp = clamp(
      toPositiveInt(meta.current_page ?? currentPage, 1),
      1,
      lastPage
    );

    if (lastPage <= 1) return null;

    const items = getPaginationRange(cp, lastPage, siblingCount);

    return (
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem key="prev">
            <PaginationPrevious
              href={buildHref(cp - 1)}
              onClick={(e) => {
                e.preventDefault();
                if (cp > 1) handlePageChange(cp - 1);
              }}
              className={
                cp === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* Numbers + Ellipses */}
          {items.map((it, idx) =>
            it === "..." ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={it}>
                <PaginationLink
                  href={buildHref(Number(it))}
                  onClick={(e) => {
                    e.preventDefault();
                    const n = Number(it);
                    if (n !== cp) handlePageChange(n);
                  }}
                  isActive={cp === it}
                  className="cursor-pointer"
                >
                  {it}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next */}
          <PaginationItem key="next">
            <PaginationNext
              href={buildHref(cp + 1)}
              onClick={(e) => {
                e.preventDefault();
                if (cp < lastPage) handlePageChange(cp + 1);
              }}
              className={
                cp === lastPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <>
      <SeoHead seo={seo || undefined} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-dark-slate break-words">
            {selectedCategoryName || "The Journal"}
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto font-lato">
            Insights, inspiration, and stories from the world of fashion
            jewellery.
          </p>
        </header>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQueryParam}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search stories, themes, or keywords"
              className="h-12 rounded-full border-slate-200 pl-12 pr-12"
            />
            {searchQueryParam && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
                onClick={() => handleSearchChange("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <p>
              {searchQueryParam && !hasActiveSearch
                ? "Use at least two characters to search by topic or keyword."
                : "Search by title, theme, or keyword to surface the right stories faster."}
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={() => handleSearchChange("")} className="px-0 text-primary-gold hover:bg-transparent hover:text-primary-gold/80">
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4 mb-12">
          <div className="flex w-max space-x-2 md:justify-center md:w-full">
            {isLoadingCategories ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24 rounded-full" />
              ))
            ) : (
              <>
                <Button
                  variant={!selectedCategorySlug ? "default" : "outline"}
                  size="sm"
                  className="rounded-full transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => handleCategorySelect(null)}
                >
                  All Posts
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    variant={
                      selectedCategorySlug === category.slug
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    className="rounded-full transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => handleCategorySelect(category.slug)}
                  >
                    {category.name}
                    {category.posts_count !== undefined && (
                      <span className="ml-1.5 text-xs opacity-70">
                        ({category.posts_count})
                      </span>
                    )}
                  </Button>
                ))}
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Post Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-opacity duration-300 ${
            isFetching ? "opacity-50" : "opacity-100"
          }`}
        >
          {isLoadingPosts ? (
            Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          ) : isError ? (
            <div className="md:col-span-2 lg:col-span-3 text-center py-16 border border-dashed rounded-lg mt-8 bg-red-50 text-red-700">
              <InfoIcon className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-xl font-medium">Something Went Wrong</h3>
              <p className="mt-1 text-sm">
                We couldn't load the posts. Please try again.
              </p>
              <Button
                onClick={() => refetch()}
                variant="destructive"
                className="mt-4"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : postsResponse?.data && postsResponse.data.length > 0 ? (
            postsResponse.data.map((post: PostType) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 mt-8">
              <EmptyState
                icon={Search}
                title={hasActiveSearch ? "No stories match your search" : "No stories found"}
                description={
                  hasActiveSearch
                    ? `We couldn’t find posts matching “${searchQueryParam}” in this view. Try another keyword or clear the search.`
                    : "There are no posts in this category yet. Why not explore another one?"
                }
                action={hasActiveSearch ? (
                  <Button variant="outline" onClick={() => handleSearchChange("")}>
                    <X className="mr-2 h-4 w-4" />
                    Clear search
                  </Button>
                ) : undefined}
              />
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoadingPosts && !isError && postsResponse?.meta && (
          <div className="mt-16">{renderPagination()}</div>
        )}
      </div>
    </>
  );
};

export default BlogHome;
