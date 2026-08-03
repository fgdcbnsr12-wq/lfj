import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const WISHLIST_KEY = 'jewellery_wishlist';
const WISHLIST_ITEMS_KEY = 'jewellery_wishlist_items';

export interface WishlistItem {
  id: number;
  name: string;
  image_url: string | null;
  affiliate_url: string | null;
}

const readStoredWishlist = () => {
  if (typeof window === 'undefined') {
    return { ids: [] as number[], items: [] as WishlistItem[] };
  }

  try {
    const storedIds = window.localStorage.getItem(WISHLIST_KEY);
    const storedItems = window.localStorage.getItem(WISHLIST_ITEMS_KEY);

    return {
      ids: storedIds ? (JSON.parse(storedIds) as number[]) : [],
      items: storedItems ? (JSON.parse(storedItems) as WishlistItem[]) : [],
    };
  } catch (error) {
    console.error('Failed to parse wishlist from localStorage', error);
    return { ids: [] as number[], items: [] as WishlistItem[] };
  }
};

export const useWishlist = () => {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = readStoredWishlist();
    setWishlistIds(stored.ids);
    setItems(stored.items);
  }, []);

  const saveToStorage = useCallback((ids: number[], itemsList: WishlistItem[]) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    window.localStorage.setItem(WISHLIST_ITEMS_KEY, JSON.stringify(itemsList));
  }, []);

  const toggleWishlist = useCallback((itemId: number, itemData?: Omit<WishlistItem, 'id'>) => {
    setWishlistIds(prev => {
      const exists = prev.includes(itemId);
      const newIds = exists ? prev.filter(id => id !== itemId) : [...prev, itemId];

      setItems(prevItems => {
        const newItems = exists
          ? prevItems.filter(i => i.id !== itemId)
          : [...prevItems, { id: itemId, ...itemData } as WishlistItem];

        saveToStorage(newIds, newItems);
        return newItems;
      });

      if (!exists) toast.success('Added to wishlist!');
      else toast.info('Removed from wishlist');

      return newIds;
    });
  }, [saveToStorage]);

  const removeFromWishlist = useCallback((itemId: number) => {
    setWishlistIds(prev => {
      const newIds = prev.filter(id => id !== itemId);
      setItems(prevItems => {
        const newItems = prevItems.filter(i => i.id !== itemId);
        saveToStorage(newIds, newItems);
        return newItems;
      });
      toast.info('Removed from wishlist');
      return newIds;
    });
  }, [saveToStorage]);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    setItems([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(WISHLIST_KEY);
      window.localStorage.removeItem(WISHLIST_ITEMS_KEY);
    }
    toast.info('Wishlist cleared');
  }, []);

  const isInWishlist = useCallback((itemId: number) => wishlistIds.includes(itemId), [wishlistIds]);

  return { wishlist: wishlistIds, items, toggleWishlist, removeFromWishlist, clearWishlist, isInWishlist };
};
