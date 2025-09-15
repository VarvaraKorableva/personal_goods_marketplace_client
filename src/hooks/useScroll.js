import React from 'react';
import { useItemsContext } from '../contexts/ItemsContext';

export default function useScroll({ 
  getAllItems,
}) {

  const {
    lastFourtyItems,
    setLastFourtyItems,
    totalCountOfAds,
    setTotalCountOfAds,
    isPageItemsLoading,
    setIsPageItemsLoading,
    page,
    setPage
  } = useItemsContext();

  const pageRef = React.useRef(page);
  const isLoadingRef = React.useRef(isPageItemsLoading);

  React.useEffect(() => { pageRef.current = page; }, [page]);
  React.useEffect(() => { isLoadingRef.current = isPageItemsLoading; }, [isPageItemsLoading]);

  const isBottom = () =>
  window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 50;

const handleScroll = React.useCallback(() => {
  if (isBottom() && !isLoadingRef.current && lastFourtyItems.length < totalCountOfAds) {
    const nextPage = pageRef.current + 1;

    // сразу блокируем
    isLoadingRef.current = true;
    setIsPageItemsLoading(true);

    getAllItems(nextPage).finally(() => {
      isLoadingRef.current = false;
      setIsPageItemsLoading(false);
    });

    setPage(nextPage);
  }
}, [lastFourtyItems, totalCountOfAds, getAllItems, setPage, setIsPageItemsLoading]);





  return { handleScroll };
}
