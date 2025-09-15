import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../Api/Api'
import { useItemsContext } from "..//contexts/ItemsContext";

export default function useLoading() {
  const {
    lastFourtyItems,
    setLastFourtyItems,
    itemsAfterSearch,
    setItemsAfterSearch,
    totalCountOfAds,
    setTotalCountOfAds,
    page,
    setPage,
    isPageItemsLoading,
    setIsPageItemsLoading,
  } = useItemsContext();

    const [isLoading, setIsLoading] = React.useState(false) 

    const openLoading = () => {
        setIsLoading(true)
      }
    
    const closeLoading = () => {
        setIsLoading(false)
      }

  return {
    openLoading,
    closeLoading,
    isLoading,
  };

};