import React, { createContext, useState, useContext } from "react";

const ItemsContext = createContext();

export const useItemsContext = () => useContext(ItemsContext);

export const ItemsProvider = ({ children }) => {
  const [lastFourtyItems, setLastFourtyItems] = useState([])
  const [itemsAfterSearch, setItemsAfterSearch] = useState([]);
  const [totalCountOfAds, setTotalCountOfAds] = useState(0);
  const [page, setPage] = useState(1);
  const [isPageItemsLoading, setIsPageItemsLoading] = useState(false);

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
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
