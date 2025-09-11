import { useState } from "react";
import * as Api from '../../Api/Api'

export default function useFilters({openLoading, closeLoading, setPopupMessage, openSuccessfulActionPopup, }) {
    //filter query
    const [city, setCity] = useState('') 
    const [lowPrice, setLowPrice] = useState(0) 
    const [highPrice, setHighPrice] = useState(0) 
    const [condition, setCondition] = useState('') 
    const [title, setTitle] = useState('') 
    const [itemsAfterSearch, setItemsAfterSearch] = useState([])

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
        setItemsAfterSearch,
        resetAllfilters,
        handleGetItemsByFilter,
        handleCityPriceAndConditionChange,
        handleTitleChange,
        itemsAfterSearch,
  };
}
