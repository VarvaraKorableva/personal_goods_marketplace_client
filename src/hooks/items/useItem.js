import { useState } from "react";
import * as Api from '../../Api/Api'

export default function useItem({setItemsAfterSearch, setMyAds, setLastFoutryItems, setItemsSecondPageSearch, openLoading, closeLoading, closeAllPopups, setTotalCountOfAds, setIsPageItemsLoading, setSelectedItem, setIsLoading, }) {


  const deleteMyAd = (item_id) => {
    openLoading()
    Api.deleteItem(item_id)
    .then((res) => {
      setMyAds((state) => state.filter((item) => item.item_id !== item_id))
      setLastFoutryItems((state) => state.filter((item) => item.item_id !== item_id))
      setItemsAfterSearch((state) => state.filter((item) => item.item_id !== item_id))
      setItemsSecondPageSearch((state) => state.filter((item) => item.item_id !== item_id))
      closeLoading()
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  async function getAllItems(page = 1, limit = 20) {
    openLoading();
    try {
      const res = await Api.getAllItems({ page, limit });
      if(page == 1) {
        setTotalCountOfAds(res.totalCount);
        setLastFoutryItems(res.result);
        setItemsAfterSearch(res.result)
      }
      else {
        setLastFoutryItems(prevItems => [...prevItems, ...res.result]);
        setItemsAfterSearch(prevItems => [...prevItems, ...res.result]);
      }
      closeLoading();
      setIsPageItemsLoading(false)
      window.dispatchEvent(new Event('resize'));
    } catch (err) {
      console.log(err);
      closeLoading();
    }
  }

  const getMyItems = (owner_id) => {
    openLoading()
    Api.getUserItems(owner_id)
    .then((res) => {
      setMyAds(res.reverse())
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  const getItemById = (item_id) => {
    openLoading()
    Api.getItemById(item_id)
    .then((res)=> {
      setSelectedItem(res)
      setIsLoading(false)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }


  return {
    getAllItems,
    deleteMyAd,
    getMyItems,
    getItemById, 
  };
}
