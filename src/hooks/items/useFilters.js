import { useState } from "react";
import { useItemsContext } from "../../contexts/ItemsContext";
import * as Api from '../../Api/Api'

export default function useFilters({ getAllItems, }) {
  const {
    setPage,
    setCurrentFilters, limit,
    city, setCity,
    lowPrice, setLowPrice,
    highPrice, setHighPrice,
    condition, setCondition,
    title, setTitle,
  } = useItemsContext();


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
