import { useState } from "react";
import * as Api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import { useItemsContext } from '../../contexts/ItemsContext';

export default function useItem({
  openLoading, closeLoading, closeAllPopups, openSuccessfulActionPopup, userId, setPopupMessage, myAds, setMyAds,
}) {

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

  const [startItemsSecondPage, setStartItemsSecondPage] = useState([])
  const [itemsSecondPageSearch, setItemsSecondPageSearch] = useState([])
  const [myImages, setMyImages] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const limit = 20;

  const navigate = useNavigate()

  const deleteMyAd = (item_id) => {
    
    openLoading()
    Api.deleteItem(item_id)
    .then((res) => {
      setMyAds((state) => state.filter((item) => item.item_id !== item_id))
      setLastFourtyItems((state) => state.filter((item) => item.item_id !== item_id))
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
    setIsPageItemsLoading(true);
    openLoading();

    try {
      const res = await Api.getAllItems({ page, limit });
      
      if(page == 1) {
        setTotalCountOfAds(res.totalCount);
        setLastFourtyItems(res.result);
        setItemsAfterSearch(res.result)
      }
      else {
        setLastFourtyItems(prevItems => [...prevItems, ...res.result]);
        setItemsAfterSearch(prevItems => [...prevItems, ...res.result]);
      }
      closeLoading();
      //console.log("page:", page, res.result);
      //window.dispatchEvent(new Event('resize'));
      setIsPageItemsLoading(false);
      
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

  async function getItemsByCategoryCategoryId(category_id) {
    openLoading()
    try {
      const res = await Api.getItemsByCategory(category_id)
      setStartItemsSecondPage(res)
      setItemsSecondPageSearch(res)
      closeLoading()
    } catch (err) {
      console.log(err);
      closeLoading()
    }
  }

  return {
    getAllItems,
    deleteMyAd,
    getMyItems,
    getItemById, 
    getItemsByParentId,
    startItemsSecondPage,
    itemsSecondPageSearch,
    myImages,
    selectedItem,
    handleAddAdSubmit,
    getItemsByCategoryCategoryId,
  };
}
