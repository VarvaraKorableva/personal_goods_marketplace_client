import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../Api/Api'

export default function useScroll({setIsPageItemsLoading, isPageItemsLoading, lastFourtyItems, totalCountOfAds }) {
    const [page, setPage] = React.useState(1);

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      
        if (bottom && !isPageItemsLoading && lastFourtyItems.length < totalCountOfAds) {
          setIsPageItemsLoading(true);
          setPage(prevPage => prevPage + 1);
        }
      };
      
      const handleTouchScroll = () => {
        handleScroll();
      };

  return {
    handleScroll,
    handleTouchScroll,
    page,
  };

};