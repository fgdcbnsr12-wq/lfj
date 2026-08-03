export const normalizeSearchQuery = (value: string) =>
  value.trim().replace(/\s+/g, " ").toLowerCase();

export const hasMeaningfulSearchQuery = (value: string) => {
  const normalized = normalizeSearchQuery(value);
  return normalized.length >= 3 && !/^\s*$/.test(normalized);
};
