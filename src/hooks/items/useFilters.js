import { useState } from "react";
import { useItemsContext } from "../../contexts/ItemsContext";
import { useFiltersContext } from "../../contexts/FiltersContext";
import * as Api from '../../Api/Api'
import { ITEMS_LIMIT } from "../../const/helper";

export default function useFilters({ getAllItems, }) {
  const limit = ITEMS_LIMIT
  const {
    setPage,
  } = useItemsContext();

  const {
    city, setCity,
    lowPrice, setLowPrice,
    highPrice, setHighPrice,
    condition, setCondition,
    title, setTitle,
    setCurrentFilters,
  } = useFiltersContext();

    const resetAllfilters = () => {
        setCity('')
        setLowPrice(0)
        setHighPrice(0)
        setCondition('')
        setTitle('')
        setCurrentFilters({})
      }
    
      const handleGetItemsByFilter = () => {
        const filters = {
          city: city?.trim() || undefined,
          lowPrice: lowPrice > 0 ? lowPrice : undefined,
          highPrice: highPrice > 0 ? highPrice : undefined,
          condition: condition || undefined,
          title: title?.trim().replace(/\s+/g, " ") || undefined
        };
        setPage(1);
        setCurrentFilters(filters);
        getAllItems({ page: 1, limit, filters });
      }

  return {
        resetAllfilters,
        handleGetItemsByFilter,
  };
}
