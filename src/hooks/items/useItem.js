import React from "react";
import * as Api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import { useItemsContext } from '../../contexts/ItemsContext';
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/AppData'

export default function useItem({
  openLoading, closeLoading, closeAllPopups, openSuccessfulActionPopup, userId, setPopupMessage, myAds, setMyAds,
}) {

  const {
    setLastFourtyItems,
    setItemsAfterSearch,
    setTotalCountOfAds,
    setIsPageItemsLoading,
    myImages,
    setMyImages,
    setSelectedItem,
    startItemsSecondPage, setStartItemsSecondPage,
    itemsSecondPageSearch, setItemsSecondPageSearch,
    setIsCategoryPageItemsLoading,
    setTotalCategoryCountOfAds,
  } = useItemsContext();

  const { language } = React.useContext(LanguageContext)

  const { en, rus, hebrew } = choose;

  let translatedContext = '';
  if (language === 'en') {
    translatedContext = en;
  } else if (language === 'rus') {
    translatedContext = rus;
  } else if (language === 'hebrew') {
    translatedContext = hebrew;
  }
  const navigate = useNavigate()

  const deleteMyAd = (item_id, reason) => {
    openLoading()
    Api.deleteItem(item_id, reason)
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

  const getItemById = (item_id) => { 
    openLoading()
    Api.getItemById(item_id) 
    .then((res)=> { 
      setSelectedItem(res) 
      closeLoading() }) 
      .catch((err) => { 
        console.log(err) 
        closeLoading() 
      }) 
  }

  async function getAllItems({ page = 1, limit = 20, filters = {} }) {
    setIsPageItemsLoading(true);
    openLoading();
    
    try {
      const res = await Api.getItems({ page, limit, filters })
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
//получаем айтомы для все категорий в том числе детей внуков и правнуков
  async function getItemsByCategoryId({ page, limit, filters = {}, categoryId, recursive = true }) {
    setIsCategoryPageItemsLoading(true)
    openLoading()
    try {
      const res = await Api.getItems({       
        page,
        limit,
        filters,
        categoryId,
        recursive, 
      })
      if (page === 1) {
        // если первая страница — сбрасываем список
        setStartItemsSecondPage(res.result);
        setItemsSecondPageSearch(res.result);
        setTotalCategoryCountOfAds(res.totalCount)
      } else {
        // если следующая страница — добавляем к текущим
        setStartItemsSecondPage(prev => [...prev, ...res.result]);
        setItemsSecondPageSearch(prev => [...prev, ...res.result]);
        setTotalCategoryCountOfAds(res.totalCount)
      }
      setIsCategoryPageItemsLoading(false)
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
          setPopupMessage(`${translatedContext.successfulMessage}`)
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
          setPopupMessage(`${translatedContext.wrongMessage}`)
          openSuccessfulActionPopup()
          closeLoading()
        })
      }else {
          closeAllPopups()
          setPopupMessage(`${translatedContext.successfulMessage}`)
          setMyAds([res, ...myAds])
          openSuccessfulActionPopup()
          //adCountIncrement(userId)
          closeLoading()
          navigate(`/users/${userId}`)
      }
    })
    .catch((err)=> {
      closeAllPopups()
      setPopupMessage(`${translatedContext.wrongMessage}`)
      openSuccessfulActionPopup()
      closeLoading()
    })
  }

  return {
    getAllItems,
    deleteMyAd,
    getMyItems,
    getItemById, 
    startItemsSecondPage,
    itemsSecondPageSearch,
    handleAddAdSubmit,
    getItemsByCategoryId,
  };
}
