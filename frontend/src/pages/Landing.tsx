// src/pages/Landing.tsx
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { useSeo } from "@/hooks/useSeo";

// Import New Design Components
import HeroSection from "@/components/landing/HeroSection";
const ShopByCategory = React.lazy(() => import("@/components/landing/ShopByCategory"));
const FeaturedProducts = React.lazy(() => import("@/components/landing/FeaturedProducts"));
const JournalGrid = React.lazy(() => import("@/components/landing/JournalGrid"));
const JewelleryTryOn = React.lazy(() => import("@/components/landing/JewelleryTryOn"));

// Import Hooks
import { usePosts } from "@/hooks/usePosts";
// ✅ FIX: Import the correctly named hook for blog categories
import { useCategories } from "@/hooks/useCategories";
import { useFeaturedAffiliateProducts } from "@/hooks/useAffiliateProducts";

// Import Skeletons
import { Skeleton } from "@/components/ui/skeleton";

const Landing: React.FC = () => {
  const { seo } = useSeo("home");
  // --- Data Fetching Logic ---

  // Fetch featured affiliate products
  const { data: featuredProducts, isLoading: featuredProductsLoading } =
    useFeaturedAffiliateProducts(4);

  // Fetch latest blog posts (for the journal)
  const { data: latestBlogsResponse, isLoading: latestBlogsLoading } = usePosts(
    { page: 1, perPage: 3 }
  );
  const latestBlogs = latestBlogsResponse?.data || [];

  // ✅ FIX: Call the hook with its new name
  // Fetch categories for showcase (for the blog section)
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useCategories({ page: 1, perPage: 4 });
  const categoriesForShowcase = categoriesResponse?.data || [];

  return (
    <>
      <SeoHead seo={seo || undefined} />

      {/* --- New Page Layout Composed of New Components --- */}

      <HeroSection />

      {/* Category Showcase */}
      <Suspense fallback={<div className="container mx-auto px-6 py-24"><Skeleton className="h-10 w-1/3 mx-auto mb-12 rounded" /><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} className="h-80 rounded-lg" />))}</div></div>}>
        {categoriesLoading ? (
          <div className="container mx-auto px-6 py-24">
            <Skeleton className="h-10 w-1/3 mx-auto mb-12 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          </div>
        ) : categoriesForShowcase.length > 0 ? (
          <ShopByCategory categories={categoriesForShowcase} />
        ) : null}
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={<div className="bg-luxury-navy py-24"><div className="container mx-auto px-6"><Skeleton className="h-10 w-1/3 mx-auto mb-12 rounded bg-white/20" /><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} className="h-96 rounded-lg bg-white/20" />))}</div></div></div>}>
        {featuredProductsLoading ? (
          <div className="bg-luxury-navy py-24">
            <div className="container mx-auto px-6">
              <Skeleton className="h-10 w-1/3 mx-auto mb-12 rounded bg-white/20" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-lg bg-white/20" />
                ))}
              </div>
            </div>
          </div>
        ) : featuredProducts && featuredProducts.length > 0 ? (
          <FeaturedProducts products={featuredProducts} />
        ) : null}
      </Suspense>

      {/* Jewellery Try-On Feature Section */}
      <Suspense fallback={<div className="section-padding bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-24"><div className="container mx-auto px-6"><Skeleton className="h-10 w-1/3 mx-auto mb-8 rounded" /><Skeleton className="h-[450px] rounded-3xl" /></div></div>}>
        <JewelleryTryOn />
      </Suspense>

      {/* Wonders of Gold Feature Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
              Discover the Wonders of Gold
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Embark on an extraordinary journey through time, from gold's
                cosmic origins to its role in shaping the future. Explore the
                fascinating story of humanity's most treasured element.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Link
                to="/cosmic-origins"
                className="p-6 bg-black/30 border border-luxury-gold/20 rounded-lg hover:border-luxury-gold/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/30 transition-all duration-300">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mb-3 group-hover:text-soft-gold transition-colors duration-300">
                  Cosmic Origins
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  From neutron star collisions to ancient civilizations
                </p>
                <div className="mt-4 text-sm text-luxury-gold group-hover:translate-x-1 transition-transform duration-300">
                  Explore →
                </div>
              </Link>

              <Link
                to="/modern-technology"
                className="p-6 bg-black/30 border border-luxury-gold/20 rounded-lg hover:border-luxury-gold/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/30 transition-all duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mb-3 group-hover:text-soft-gold transition-colors duration-300">
                  Modern Technology
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  The hidden hero in your smartphone and medical devices
                </p>
                <div className="mt-4 text-sm text-luxury-gold group-hover:translate-x-1 transition-transform duration-300">
                  Explore →
                </div>
              </Link>

              <Link
                to="/future-frontiers"
                className="p-6 bg-black/30 border border-luxury-gold/20 rounded-lg hover:border-luxury-gold/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/30 transition-all duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mb-3 group-hover:text-soft-gold transition-colors duration-300">
                  Future Frontiers
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Space exploration and quantum computing innovations
                </p>
                <div className="mt-4 text-sm text-luxury-gold group-hover:translate-x-1 transition-transform duration-300">
                  Explore →
                </div>
              </Link>
            </div>

            <Link
              to="/wonders-of-gold"
              className="inline-flex items-center px-8 py-4 bg-luxury-gold hover:bg-soft-gold text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="mr-2">✨</span>
              Begin the Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts / Journal */}
      <Suspense fallback={<div className="container mx-auto px-6 py-24"><Skeleton className="h-10 w-1/3 mx-auto mb-12 rounded" /><div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><Skeleton className="h-[500px] rounded-lg" /><div className="space-y-6"><Skeleton className="h-36 rounded-lg" /><Skeleton className="h-36 rounded-lg" /></div></div></div>}>
        {latestBlogsLoading ? (
          <div className="container mx-auto px-6 py-24">
            <Skeleton className="h-10 w-1/3 mx-auto mb-12 rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="h-[500px] rounded-lg" />
              <div className="space-y-6">
                <Skeleton className="h-36 rounded-lg" />
                <Skeleton className="h-36 rounded-lg" />
              </div>
            </div>
          </div>
        ) : latestBlogs.length > 0 ? (
          <JournalGrid posts={latestBlogs} />
        ) : null}
      </Suspense>
    </>
  );
};

export default Landing;
