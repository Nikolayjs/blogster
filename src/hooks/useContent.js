import { useMemo } from 'react';

export const useSortedContent = (content, sort) => {
  const sortedContent = useMemo(() => {
    if (sort) {
      return [...content].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return content;
  }, [sort, content]);
  return sortedContent;
};

export const useContent = (content, sort, query) => {
  const sortedContent = useSortedContent(content, sort);

  const sortedAndSearchedContent = useMemo(() => {
    return sortedContent.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.content.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedContent]);

  return sortedAndSearchedContent;
};
