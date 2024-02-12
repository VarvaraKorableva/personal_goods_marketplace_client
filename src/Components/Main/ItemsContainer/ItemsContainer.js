import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';

function ItemsContainer({lastFourtyItems, getItemById, addToFavorites, deleteFromFavorites, favorite}) {

    return(
        <ul className="itemsContainer-listings-container">
            {lastFourtyItems.map((item) => (
                <OneAd 
                    key={item.item_id} 
                    item={item} 
                    getItemById={getItemById} 
                    addToFavorites={addToFavorites}
                    deleteFromFavorites={deleteFromFavorites}
                    favorite={favorite}
                />
            ))}
        </ul>
    )
}

export default ItemsContainer;