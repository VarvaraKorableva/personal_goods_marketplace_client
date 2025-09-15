import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';
import { useItemsContext } from "../../../contexts/ItemsContext";

function ItemsContainer({
    isLoggin,
    getItemById, 
    addToFavorites, deleteFromFavorites, 
    favorite, favoriteItems, openDeletePopup, openFirstMessagePopup, handleUpdateIsReserved, updateItemCity,
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
                    favoriteItems={favoriteItems}
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