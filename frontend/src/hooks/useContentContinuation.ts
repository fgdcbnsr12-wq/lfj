import { useCallback, useState } from 'react';

export type ContinuationKind = 'blog' | 'event' | 'product';

export interface ContinuationEntry {
  kind: ContinuationKind;
  title: string;
  path: string;
  slug?: string;
  subtitle?: string;
  imageUrl?: string | null;
  visitedAt: string;
}

const STORAGE_KEY = 'lfj_content_continuation_v1';
const MAX_HISTORY = 8;

const readStoredHistory = (): ContinuationEntry[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as ContinuationEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const useContentContinuation = () => {
  const [history, setHistory] = useState<ContinuationEntry[]>(readStoredHistory);

  const persistHistory = useCallback((nextHistory: ContinuationEntry[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
    } catch {
      // Ignore storage write errors in restricted environments.
    }
    setHistory(nextHistory);
  }, []);

  const markVisited = useCallback((entry: ContinuationEntry) => {
    const current = readStoredHistory();
    const deduped = current.filter(
      (item) => !(item.kind === entry.kind && item.slug && entry.slug && item.slug === entry.slug)
    );

    const nextHistory = [
      {
        ...entry,
        visitedAt: new Date().toISOString(),
      },
      ...deduped,
    ].slice(0, MAX_HISTORY);

    persistHistory(nextHistory);
  }, [persistHistory]);

  const clearHistory = useCallback(() => {
    persistHistory([]);
  }, [persistHistory]);

  return {
    history,
    markVisited,
    clearHistory,
  };
};
