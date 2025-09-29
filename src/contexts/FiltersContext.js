import React, { createContext, useState, useContext } from "react";

const FiltersContext = createContext();
export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
    const [city, setCity] = useState('') 
    const [lowPrice, setLowPrice] = useState(0) 
    const [highPrice, setHighPrice] = useState(0) 
    const [condition, setCondition] = useState('') 
    const [title, setTitle] = useState('') 
    const [currentFilters, setCurrentFilters] = useState({})

  return (
    <FiltersContext.Provider 
    value={{
        city, setCity,
        lowPrice, setLowPrice,
        highPrice, setHighPrice,
        condition, setCondition,
        title, setTitle,
        currentFilters, setCurrentFilters
      }}>
      {children}
    </FiltersContext.Provider>
  );
};
