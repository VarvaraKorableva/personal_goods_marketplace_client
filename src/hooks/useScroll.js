import React from 'react';
import { useItemsContext } from '../contexts/ItemsContext';
import { useFiltersContext } from "../contexts/FiltersContext";
import { ITEMS_LIMIT } from "../const/helper";

export default function useScroll({ 
  getAllItems, getItemsByCategoryId
}) {

  const {
    lastFourtyItems,
    totalCountOfAds,
    isPageItemsLoading,
    setIsPageItemsLoading,
    page,
    setPage,
    categoryPage, setCategoryPage,
    startItemsSecondPage,
    isCategoryPageItemsLoading, setIsCategoryPageItemsLoading,
    categoryId,
    totalCategoryCountOfAds,
  } = useItemsContext();

  const {
    currentFilters,
  } = useFiltersContext();

  const limit = ITEMS_LIMIT

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
