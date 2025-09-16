import { useState } from "react";
import * as Api from '../../Api/Api'
import { useItemsContext } from '../../contexts/ItemsContext';

export default function useItemUpdate(userId, {openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup, setIsReserved, isReserved,}) {

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

  const updateDescription = (item_id, description) => {
    openLoading()
    Api.updateDescription(item_id, description)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  const updatePrice = (item_id, price) => {
    openLoading()
    Api.updatePrice(item_id, price)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  const updateItemCity = (item_id, city) => {
    openLoading()
    Api.updateItemCity(item_id, city)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  const updateCondition = (item_id, condition) => {
    openLoading()
    Api.updateCondition(item_id, condition)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  function handleUpdateIsReserved(item_id) {
    Api.updateIsReserved(item_id, userId)
    .then((res) => {
      setIsReserved(!isReserved)
    })
    .catch((err) => {
      console.log(err)
      setPopupMessage("Something wrong, plese try again")
    })
  }


  return {
    updateDescription,
    updatePrice,
    updateItemCity,
    updateCondition,
    handleUpdateIsReserved,
  };

};


