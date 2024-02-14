import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';

function ItemsContainer({isLoggin, itemsAfterSearch, lastFourtyItems, getItemById, addToFavorites, deleteFromFavorites, favorite}) {

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
                />
            ))}
        </ul>
    )
}

export default ItemsContainer;