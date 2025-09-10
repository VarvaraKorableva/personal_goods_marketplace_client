import { useState } from "react";
import * as Api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'

export default function useItem({
  setItemsAfterSearch, setLastFoutryItems, openLoading, closeLoading, closeAllPopups, 
  setTotalCountOfAds, setIsPageItemsLoading, setSelectedItem, setIsLoading, 
  setMyImages, openSuccessfulActionPopup, 
  userId, myImages, setPopupMessage, myAds, setMyAds,
}) {
  const [startItemsSecondPage, setStartItemsSecondPage] = useState([])
  const [itemsSecondPageSearch, setItemsSecondPageSearch] = useState([])

  const navigate = useNavigate()

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

  async function getItemsByParentId(parent_id) {
    openLoading()
    try {
      const res = await Api.getItemsBySubCategoriesByParentId(parent_id)
      setStartItemsSecondPage(res)
      setItemsSecondPageSearch(res)
      closeLoading()
    } catch (err) {
      console.log(err);
      closeLoading()
    }
  }

  function handleAddAdSubmit(data) {
    openLoading()
    const { formData, ...otherData } = data;
    Api.createItem(otherData)
    .then((res)=> {
      if(formData) {
        const id = res.item_id
        const str_item_id = Number(id)
        formData.append('str_item_id', str_item_id); 
        formData.append('user_id', userId); 
        
        Api.uploadMultipleFiles(formData)
        .then((res) => {
          setMyImages([res[0], ...myImages])
          closeAllPopups()
          setPopupMessage("Ad added successful!")
          setMyAds([res, ...myAds])
          openSuccessfulActionPopup()
          //adCountIncrement(userId)
          closeLoading()
        })
        .then(()=> {
          //getAllItems()
          navigate(`/users/${userId}`)
        })
        .catch((err)=> {
          closeAllPopups()
          setPopupMessage("Something wrong, plese try again")
          openSuccessfulActionPopup()
          closeLoading()
        })
      }else {
          closeAllPopups()
          setPopupMessage("Ad added successful!")
          setMyAds([res, ...myAds])
          openSuccessfulActionPopup()
          //adCountIncrement(userId)
          closeLoading()
          navigate(`/users/${userId}`)
      }
    })
    .catch((err)=> {
      closeAllPopups()
      setPopupMessage("Something wrong, please try again")
      openSuccessfulActionPopup()
      closeLoading()
    })
  }

  return {
    getAllItems,
    deleteMyAd,
    getMyItems,
    getItemById, 
    getItemsByParentId,
    startItemsSecondPage,
    itemsSecondPageSearch,
    handleAddAdSubmit,
  };
}
