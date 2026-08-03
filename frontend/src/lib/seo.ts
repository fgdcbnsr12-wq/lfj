export const buildArchivePageStateDescription = ({
  name,
  page = 1,
  fallbackDescription,
}: {
  name: string;
  page?: number;
  fallbackDescription: string;
}) => {
  const base = fallbackDescription || `Browse ${name} articles and editorial content.`;

  if (page <= 1) {
    return base;
  }

  return `${base} Page ${page} of the archive.`;
};

export const buildCanonicalPath = (basePath: string, page = 1) => {
  if (!basePath) {
    return basePath;
  }

  if (page <= 1) {
    return basePath;
  }

  const separator = basePath.includes('?') ? '&' : '?';
  return `${basePath}${separator}page=${page}`;
};
