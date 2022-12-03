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

export const useFilteredContent = (content, filter) => {
  const filteredContent = useMemo(() => {
    if (filter) {
      return [...content].filter((el) => el.tags.includes(filter));
    }
  }, [filter, content]);
  return filteredContent;
};

export const useContent = (content, sort, filter, query) => {
  const sortedContent = useSortedContent(content, sort);
  const filteredContent = useFilteredContent(content, filter);
  const sortedAndSearchedContent = useMemo(() => {
    if (!query && filteredContent) {
      return filteredContent;
    }
    return sortedContent.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.content.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedContent, filteredContent]);

  return sortedAndSearchedContent;
};
