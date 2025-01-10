import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';

function ItemsContainer({
    isLoggin, itemsAfterSearch, 
    getItemById, 
    addToFavorites, deleteFromFavorites, 
    favorite, favoriteItems, openDeletePopup, openFirstMessagePopup, handleUpdateIsReserved, updateItemCity,
}) {

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