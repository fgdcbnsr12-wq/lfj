// src/components/shop/AffiliateProductCard.tsx
import React, { useState, useMemo } from "react";
import { AffiliateProduct } from "@/services/jewelleryService";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import ProductImage from "@/components/ui/ProductImage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useWishlist } from '@/hooks/useWishlist';
import { useContentContinuation } from '@/hooks/useContentContinuation';
import { ExternalLinkIcon, Heart, Star } from "lucide-react";

interface AffiliateProductCardProps {
  product: AffiliateProduct;
  onClick?: () => void;
  placement?: string;
}

const AffiliateProductCard: React.FC<AffiliateProductCardProps> = ({
  product,
  onClick,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { markVisited } = useContentContinuation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const randomRating = useMemo(() => {
    return product.rating || parseFloat((4.0 + Math.random()).toFixed(1));
  }, [product.id, product.rating]);

  const filledStars = Math.round(randomRating);

  return (
    // The entire card is clickable, triggering the main onClick from the parent
    <Card
      className="card-elegant group h-full flex flex-col cursor-pointer"
      onClick={() => {
        markVisited({
          kind: 'product',
          title: product.name,
          path: product.affiliate_url || '/shop',
          slug: product.asin || String(product.id),
          subtitle: product.notes || 'Continue exploring this product',
          imageUrl: product.image_url || null,
          visitedAt: new Date().toISOString(),
        });
        onClick?.();
      }}
    >
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, {
              name: product.name,
              image_url: product.image_url || null,
              affiliate_url: product.affiliate_url,
            });
          }}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-current text-red-500" : ""
            }`}
          />
        </Button>
      </div>

      {/* ✅ FIX: The <a> tag has been REMOVED from around the AspectRatio. */}
      {/* The AspectRatio component is now a direct child of the Card. */}
      {/* This allows its size to be calculated correctly, and `object-cover` will work as expected. */}
      <AspectRatio
        ratio={1}
        className="bg-muted/30 overflow-hidden rounded-t-xl"
      >
        {product.image_url ? (
          <ProductImage
            src={product.image_url}
            imageUrls={product.image_urls}
            alt={product.name}
            fallbackSrc="/images/placeholder.svg"
            showViewer={true}
            className="transition-transform duration-700"
            onClick={(event) => event.stopPropagation()}
          />
        ) : (
          <div className="w-full h-full bg-muted/50 flex items-center justify-center">
            <Star className="w-12 h-12 text-muted-foreground/50" />
          </div>
        )}
      </AspectRatio>

      {/* The rest of the card content remains clickable and interactive */}
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="text-sm md:text-base font-medium font-inter line-clamp-2 leading-relaxed mb-3 h-12 text-foreground group-hover:text-primary transition-colors duration-300">
            {/* The title is still a link, but it doesn't wrap the image anymore */}
            <a
              href={product.affiliate_url || "#"}
              target="_blank"
              rel="noopener sponsored"
              onClick={(e) => e.stopPropagation()} // Stop propagation so it doesn't trigger the card's main onClick
            >
              {product.name}
            </a>
          </CardTitle>
          <div className="flex items-center space-x-1 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < filledStars
                    ? "text-primary fill-current"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              ({randomRating.toFixed(1)})
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium rounded-lg group-hover:shadow-lg transition-all duration-300"
          onClick={(e) => e.stopPropagation()} // Also stop propagation here
        >
          <a
            href={product.affiliate_url || "#"}
            target="_blank"
            rel="noopener sponsored"
          >
            <span>Shop Now</span>
            <ExternalLinkIcon className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AffiliateProductCard;
