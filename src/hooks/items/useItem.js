import React from "react";
import * as Api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import { useItemsContext } from '../../contexts/ItemsContext';
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/AppData'

export default function useItem({
  userId, setUserAds, openLoading, closeLoading, closeAllPopups, openSuccessfulActionPopup, currentUser, setPopupMessage, myAds, myAdsCount, setMyAdsCount, setMyAds,
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

const deleteMyAd = async (item_id, reason) => {
  try {
    openLoading();

    await Api.deleteItem(item_id, reason);
    await Api.adCountDecrement(currentUser.user_id);

    setMyAds(prev => prev.filter(item => item.item_id !== item_id));
    setMyAdsCount(prev => prev - 1);
    
    setLastFourtyItems(prev => prev.filter(item => item.item_id !== item_id));
    setItemsAfterSearch(prev => prev.filter(item => item.item_id !== item_id));
    setItemsSecondPageSearch(prev => prev.filter(item => item.item_id !== item_id));
    closeAllPopups();
  } catch (err) {
    console.error(err);
  } finally {
    closeLoading();
  }
};

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
      
      if(owner_id === userId) {
        setMyAds(res.reverse())
        setMyAdsCount(myAds.length)
      } else {
        setUserAds(res.reverse())
      }

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

async function handleAddAdSubmit(data) {
  openLoading();
  
  try {
    const { formData, ...otherData } = data;
    const res = await Api.createItem(otherData);
    const id = res.item_id;

    //await Api.adCountIncrement(currentUser.user_id);
    setMyAdsCount(prev => prev + 1);

    if (formData) {
      formData.append('str_item_id', Number(id));
      formData.append('user_id', currentUser.user_id);
      
      const uploadRes = await Api.uploadMultipleFiles(formData);
      setMyImages(prev => [uploadRes[0], ...prev]);
    }

    setMyAds(prev => [res, ...prev]);
    closeAllPopups();
    setPopupMessage(translatedContext.successfulMessage);
    openSuccessfulActionPopup();
    navigate(`/users/${currentUser.user_id}`);
    
  } catch (err) {
    console.error(err);
    closeAllPopups();
    setPopupMessage(translatedContext.wrongMessage);
    openSuccessfulActionPopup();
  } finally {
    closeLoading();
  }
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
