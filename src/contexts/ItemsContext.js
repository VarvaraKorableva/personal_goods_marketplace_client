import React, { createContext, useState, useContext } from "react";

const ItemsContext = createContext();

export const useItemsContext = () => useContext(ItemsContext);

export const ItemsProvider = ({ children }) => {
  const [lastFourtyItems, setLastFourtyItems] = useState([])
  const [itemsAfterSearch, setItemsAfterSearch] = useState([]);
  const [totalCountOfAds, setTotalCountOfAds] = useState(0);
  const [page, setPage] = useState(1);
  const [isPageItemsLoading, setIsPageItemsLoading] = useState(false);
  const [myImages, setMyImages] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  
  const [categoryPage, setCategoryPage] = useState(1);
/*  
const [currentFilters, setCurrentFilters] = useState({})
const [city, setCity] = useState('') 
  const [lowPrice, setLowPrice] = useState(0) 
  const [highPrice, setHighPrice] = useState(0) 
  const [condition, setCondition] = useState('') 
const [title, setTitle] = useState('') */
  const [startItemsSecondPage, setStartItemsSecondPage] = useState([])
  const [itemsSecondPageSearch, setItemsSecondPageSearch] = useState([])
  const [isCategoryPageItemsLoading, setIsCategoryPageItemsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('')
  const [totalCategoryCountOfAds, setTotalCategoryCountOfAds] = useState(0);

  return (
    <ItemsContext.Provider
      value={{
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
        myImages,
        setMyImages,
        selectedItem,
        setSelectedItem,
        /*currentFilters, setCurrentFilters,
        city, setCity,
        lowPrice, setLowPrice,
        highPrice, setHighPrice,
        condition, setCondition,
        title, setTitle,*/
        categoryPage, setCategoryPage,
        startItemsSecondPage, setStartItemsSecondPage,
        itemsSecondPageSearch, setItemsSecondPageSearch,
        isCategoryPageItemsLoading, setIsCategoryPageItemsLoading,
        categoryId, setCategoryId,
        totalCategoryCountOfAds, setTotalCategoryCountOfAds,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
