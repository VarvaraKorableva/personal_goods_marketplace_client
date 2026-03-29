import React, { createContext, useState, useContext } from "react";

const FiltersContext = createContext();
export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
    const [city, setCity] = useState('') 
    const [city_ru, setCity_ru] = React.useState('')
    const [city_en, setCity_en] = React.useState('')
    const [city_he, setCity_he] = React.useState('')
    const [lowPrice, setLowPrice] = useState(0) 
    const [highPrice, setHighPrice] = useState(0) 
    const [condition, setCondition] = useState('') 
    const [title, setTitle] = useState('') 
    const [currentFilters, setCurrentFilters] = useState({})

  return (
    <FiltersContext.Provider 
    value={{
        city, setCity,
        city_ru, city_en, city_he,
        setCity_ru, setCity_en, setCity_he,
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
