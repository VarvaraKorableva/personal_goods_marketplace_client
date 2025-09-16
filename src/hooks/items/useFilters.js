import { useState } from "react";
import * as Api from '../../Api/Api'
import { useItemsContext } from "../../contexts/ItemsContext";

export default function useFilters({openLoading, closeLoading, setPopupMessage, openSuccessfulActionPopup, }) {
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

    const [city, setCity] = useState('') 
    const [lowPrice, setLowPrice] = useState(0) 
    const [highPrice, setHighPrice] = useState(0) 
    const [condition, setCondition] = useState('') 
    const [title, setTitle] = useState('') 

    const resetAllfilters = () => {
        setCity('')
        setLowPrice(0)
        setHighPrice(0)
        setCondition('')
      }
    
      const handleGetItemsByFilter = () => {
        openLoading()
        const filters = {
          city: city,
          lowPrice: lowPrice,
          highPrice: highPrice,
          condition: condition,
          title: title?.trim().replace(/\s+/g, " ") || "",
        };
    
        Api.getItemsByFilter(filters)
        .then((res) => {
          setItemsAfterSearch(res)
          closeLoading()
        })
        .catch((err) => {
          closeLoading()
          setPopupMessage("Something wrong, plese try again")
          openSuccessfulActionPopup()
        })
      }

      function handleCityPriceAndConditionChange(cityFromInput, lowPriceFromInput, highPriceFromInput, conditionFromInput) {
        setCity(cityFromInput)
        setLowPrice(lowPriceFromInput)
        setHighPrice(highPriceFromInput)
        setCondition(conditionFromInput)
      }

      function handleTitleChange(keyWord) {
        setTitle(keyWord)
      }

  return {
        resetAllfilters,
        handleGetItemsByFilter,
        handleCityPriceAndConditionChange,
        handleTitleChange,
  };
}
