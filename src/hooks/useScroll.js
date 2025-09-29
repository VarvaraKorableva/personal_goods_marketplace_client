import React from 'react';
import { useItemsContext } from '../contexts/ItemsContext';

export default function useScroll({ 
  getAllItems, getItemsByCategoryId
}) {

  const {
    lastFourtyItems,
    setLastFourtyItems,
    totalCountOfAds,
    setTotalCountOfAds,
    isPageItemsLoading,
    setIsPageItemsLoading,
    page,
    setPage,
    currentFilters, setCurrentFilters, limit,
    categoryPage, setCategoryPage,
    startItemsSecondPage, setStartItemsSecondPage,
    itemsSecondPageSearch, setItemsSecondPageSearch,
    isCategoryPageItemsLoading, setIsCategoryPageItemsLoading,
    categoryId, setCategoryId,
    totalCategoryCountOfAds, setTotalCategoryCountOfAds,
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

    isLoadingRef.current = true;
    setIsPageItemsLoading(true);

    getAllItems({ page: nextPage, limit, filters: currentFilters }).finally(() => {
      isLoadingRef.current = false;
      setIsPageItemsLoading(false);
    });

    setPage(nextPage);
  }
}, [lastFourtyItems, totalCountOfAds, getAllItems, setPage, setIsPageItemsLoading]);


const categoryPageRef = React.useRef(categoryPage);
const isCategoryLoadingRef = React.useRef(isCategoryPageItemsLoading);

React.useEffect(() => { categoryPageRef.current = categoryPage; }, [categoryPage]);
React.useEffect(() => { isCategoryLoadingRef.current = isCategoryPageItemsLoading; }, [isCategoryPageItemsLoading]);

const handleCategoryScroll = React.useCallback(() => {
  if (
    isBottom() &&
    !isCategoryLoadingRef.current &&
    startItemsSecondPage.length < totalCategoryCountOfAds
  ) {
    const nextPage = categoryPageRef.current + 1;

    isCategoryLoadingRef.current = true;
    setIsCategoryPageItemsLoading(true);

    getItemsByCategoryId({
      page: nextPage,
      limit,
      filters: currentFilters,
      categoryId,
      recursive: true,
    }).finally(() => {
      isCategoryLoadingRef.current = false;
      setIsCategoryPageItemsLoading(false);
    });

    setCategoryPage(nextPage);
  }
}, [
  startItemsSecondPage,
  totalCategoryCountOfAds,
  getItemsByCategoryId,
  setCategoryPage,
  isCategoryPageItemsLoading,
  categoryId,
]);

  return { handleScroll, handleCategoryScroll };
}
