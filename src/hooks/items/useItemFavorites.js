import { useState } from "react";
import * as Api from '../../Api/Api'
import { useItemsContext } from "../../contexts/ItemsContext";
import { useFavorites } from "../../contexts/FavoritesContext"

export default function useItemFavorites(openLoading, closeLoading) {
//
const {
    favorite, 
    setFavorite, 
    favoriteItems,
    setFavoriteItems
  } = useFavorites();

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

  const addToFavorites = (favorite_collector_id, item_id, item) => {
    openLoading();
    Api.addToFavoritesServer({ favorite_collector_id, item_id })
      .then(() => {
        setFavorite((prev) => [item, ...prev]);
        setFavoriteItems((prev) => [item, ...prev]);
        closeLoading();
      })
      .catch((err) => {
        console.error("addToFavorites error:", err);
        closeLoading();
      });
  };

  const deleteFromFavorites = (favItem) => {
    openLoading();
    Api.deleteFromFavoritesServer(favItem.item_id)
      .then(() => {
        setFavorite((prev) => prev.filter((i) => i.item_id !== favItem.item_id));
        setFavoriteItems((prev) =>
          prev.filter((i) => i.item_id !== favItem.item_id)
        );
        closeLoading();
      })
      .catch((err) => {
        console.error("deleteFromFavorites error:", err);
        closeLoading();
      });
  }; 

  const getMyFavorites = (favorite_collector_id, lastFourtyItems = []) => {
    openLoading();
    Api.getMyFavorites(favorite_collector_id)
      .then((res) => {
        setFavorite(res);
        const favoriteItemsResult = lastFourtyItems.filter((item) =>
          res.some((f) => f.item_id === item.item_id) //////из всего всего аррея ищится избранное а в аррее нет тех кто делитед тру
        );
        setFavoriteItems(favoriteItemsResult);
        closeLoading();
      })
      .catch((err) => {
        console.error("getMyFavorites error:", err);
        closeLoading();
      });
  };

  const resetFavorites = () => {
    setFavorite([]);
    setFavoriteItems([]);
  };

  return {
    addToFavorites,
    deleteFromFavorites,
    getMyFavorites,
    resetFavorites,
  };
}
