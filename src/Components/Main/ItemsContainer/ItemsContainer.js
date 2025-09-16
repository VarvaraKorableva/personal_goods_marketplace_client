import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';
import { useItemsContext } from "../../../contexts/ItemsContext";
import { useFavorites } from "../../../contexts/FavoritesContext"

function ItemsContainer({
    isLoggin,
    getItemById, 
    addToFavorites, deleteFromFavorites, 
    openDeletePopup, openFirstMessagePopup, handleUpdateIsReserved, updateItemCity,
}) {

    
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

    return(
        <ul className="itemsContainer-listings-container">
            {itemsAfterSearch.map((item) => (
                <OneAd 
                    key={item.item_id} 
                    item={item} 
                    getItemById={getItemById} 
                    addToFavorites={addToFavorites}
                    deleteFromFavorites={deleteFromFavorites}
                    favorite={favorite}
                    isLoggin={isLoggin}
                    
                    openDeletePopup={openDeletePopup}
                    openFirstMessagePopup = {openFirstMessagePopup}
                    handleUpdateIsReserved={handleUpdateIsReserved}
                    updateItemCity={updateItemCity}
                />
            ))}
            </ul>
    )
}

export default ItemsContainer;