////ThirdCategoryItemsContainer

import OneAd from '../../../OneAd/OneAd'
import './ThirdCategoryItemsContainer.css';

function ThirdCategoryItemsContainer({itemsAfterSearch, lastFourtyItems, getItemById, addToFavorites, deleteFromFavorites, favorite}) {

    return(
        <ul className="thirdCategoryItemsContainer-listings-container">
            {itemsAfterSearch.map((item) => (
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

export default ThirdCategoryItemsContainer;