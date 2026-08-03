
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, Sparkles, Heart, Star, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import ProductImage from '@/components/ui/ProductImage';

const Trends: React.FC = () => {
  const trendingStyles = [
    {
      name: "Layered Necklaces",
      description: "Stack multiple delicate chains for an effortlessly chic look",
      trend: "Rising 45%",
      image: "https://images.unsplash.com/photo-1599459183200-59c7687a0275?q=80&w=800&auto=format&fit=crop",
      tags: ["Minimalist", "Versatile", "Everyday"]
    },
    {
      name: "Statement Earrings",
      description: "Bold, dramatic pieces that become the focal point of any outfit",
      trend: "Hot",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop",
      tags: ["Bold", "Evening", "Glamorous"]
    },
    {
      name: "Chunky Gold Chains",
      description: "Thick, substantial chains that make a powerful fashion statement",
      trend: "Celebrity Favorite",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      tags: ["Luxury", "Statement", "Trendy"]
    },
    {
      name: "Pearl Renaissance",
      description: "Modern takes on classic pearls with contemporary designs",
      trend: "Vintage Revival",
      image: "https://images.unsplash.com/photo-1588444650785-344adc4e7973?q=80&w=800&auto=format&fit=crop",
      tags: ["Classic", "Elegant", "Timeless"]
    }
  ];

  const seasonalTrends = [
    {
      season: "Spring 2024",
      trends: ["Colorful Gemstones", "Floral Motifs", "Delicate Chains"],
      color: "from-pink-100 to-green-100"
    },
    {
      season: "Summer 2024",
      trends: ["Shell & Ocean Themes", "Bright Corals", "Bohemian Styles"],
      color: "from-blue-100 to-yellow-100"
    },
    {
      season: "Fall 2024",
      trends: ["Warm Metals", "Earth Tones", "Geometric Shapes"],
      color: "from-orange-100 to-red-100"
    }
  ];

  const influencerPicks = [
    {
      name: "Emma Style",
      followers: "2.3M",
      pick: "Minimalist Stacking Rings",
      quote: "These rings are perfect for creating that effortless layered look I love!"
    },
    {
      name: "Fashion Forward",
      followers: "1.8M",
      pick: "Statement Drop Earrings",
      quote: "The quality and design exceeded my expectations. Absolutely stunning!"
    },
    {
      name: "Jewelry Lover",
      followers: "950K",
      pick: "Vintage-Inspired Necklaces",
      quote: "Perfect blend of classic and contemporary. My new favorites!"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Latest Jewelry Trends 2024 | Latest Fashion Jewellery</title>
        <meta name="description" content="Stay ahead with the latest jewelry trends. Discover what's hot in fashion jewelry for 2024, from celebrity picks to seasonal must-haves." />
        <meta name="keywords" content="jewelry trends 2024, fashion jewelry, trending accessories, celebrity jewelry" />
        <meta property="og:title" content="Latest Jewelry Trends 2024 | Latest Fashion Jewellery" />
        <meta property="og:description" content="Explore the hottest jewelry trends, seasonal inspirations, and influencer picks for 2024." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/placeholder.svg" />
        <meta property="og:url" content={typeof window !== 'undefined' ? `${window.location.origin}/trends` : '/trends'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest Jewelry Trends 2024 | Latest Fashion Jewellery" />
        <meta name="twitter:description" content="Explore the hottest jewelry trends, seasonal inspirations, and influencer picks for 2024." />
        <meta name="twitter:image" content="/images/placeholder.svg" />
        <link rel="canonical" href={typeof window !== 'undefined' ? `${window.location.origin}/trends` : '/trends'} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Latest Jewelry Trends 2024',
            description: 'Stay ahead with the latest jewelry trends. Discover what\'s hot in fashion jewelry for 2024, from celebrity picks to seasonal must-haves.',
            image: '/images/placeholder.svg',
            url: typeof window !== 'undefined' ? `${window.location.origin}/trends` : '/trends',
            publisher: { '@type': 'Organization', name: 'Latest Fashion Jewellery' },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-cream-white via-soft-beige to-warm-ivory">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-8">
              <TrendingUp className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
              <h1 className="text-5xl md:text-6xl font-playfair font-bold heading-elegant mb-6">
                Latest Jewelry Trends
              </h1>
              <p className="text-xl text-elegant max-w-3xl mx-auto leading-relaxed">
                Stay ahead of the curve with the hottest jewelry trends of 2024. 
                From celebrity favorites to runway inspirations, discover what's defining fashion jewelry this year.
              </p>
            </div>
            
            <Button size="lg" className="btn-elegant" asChild>
              <Link to="/shop">Shop Trending Pieces</Link>
            </Button>
          </div>
        </section>

        {/* Trending Styles */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-playfair font-bold text-center text-luxury-navy mb-12">
              What's Trending Now
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {trendingStyles.map((style, index) => (
                <Card key={index} className="overflow-hidden border-luxury-gold/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <ProductImage
                      src={style.image}
                      alt={style.name}
                      fallbackSrc="/images/placeholder.svg"
                      showViewer={false}
                      className="absolute inset-0"
                      ratio={16 / 9}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-luxury-gold text-white font-semibold">
                        {style.trend}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair text-luxury-navy">
                      {style.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{style.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {style.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="border-luxury-gold/30 text-luxury-gold">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-luxury-gold hover:text-luxury-gold/80 p-0" asChild>
                      <Link to="/shop">
                        Shop This Trend <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Trends */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-playfair font-bold text-center text-luxury-navy mb-12">
              Seasonal Trends 2024
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {seasonalTrends.map((season, index) => (
                <Card key={index} className={`bg-gradient-to-br ${season.color} border-0 hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    <Calendar className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                    <CardTitle className="text-xl font-playfair text-luxury-navy">
                      {season.season}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {season.trends.map((trend, trendIndex) => (
                        <li key={trendIndex} className="flex items-center gap-2 text-gray-700">
                          <Sparkles className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Influencer Picks */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-playfair font-bold text-center text-luxury-navy mb-12">
              Influencer Favorites
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {influencerPicks.map((influencer, index) => (
                <Card key={index} className="border-luxury-gold/20 hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-luxury-gold" />
                    </div>
                    <CardTitle className="text-lg font-playfair text-luxury-navy">
                      {influencer.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{influencer.followers} followers</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge className="bg-luxury-gold text-white mb-3">
                      {influencer.pick}
                    </Badge>
                    <p className="text-gray-600 italic">"{influencer.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-luxury-navy text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <Star className="w-12 h-12 text-luxury-gold mx-auto mb-6" />
              <h2 className="text-3xl font-playfair font-bold mb-4">
                Stay Trend-Forward
              </h2>
              <p className="text-lg text-gray-200 mb-8">
                Be the first to know about the latest jewelry trends, celebrity picks, and exclusive collections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button size="lg" className="btn-elegant bg-luxury-gold hover:bg-luxury-gold/90" asChild>
                  <Link to="/blog">Read Our Journal</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white" asChild>
                  <Link to="/shop">Shop Trends</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Trends;
