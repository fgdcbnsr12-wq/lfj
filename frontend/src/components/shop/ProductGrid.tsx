import React from "react";
import AffiliateProductCard from "./AffiliateProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { AffiliateProduct } from "@/services/jewelleryService";
import EmptyState from "@/components/ui/EmptyState";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products?: AffiliateProduct[];
  isLoading: boolean;
  onProductClick: (url?: string | null) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  onClearSearch?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  isLoading,
  onProductClick,
  emptyTitle = "No products found",
  emptyDescription = "Try a broader search or browse another collection.",
  onClearSearch,
}) => {
  // 3. This 'if' block handles the loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full">
        <EmptyState
          icon={Search}
          title={emptyTitle}
          description={emptyDescription}
          action={onClearSearch ? (
            <Button variant="outline" onClick={onClearSearch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear search
            </Button>
          ) : undefined}
          className="bg-white"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <AffiliateProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.affiliate_url)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
