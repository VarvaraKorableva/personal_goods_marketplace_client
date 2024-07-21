import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';
import testData from '../../../const/testData'

function ItemsContainer({
    isLoggin, itemsAfterSearch, 
    getItemById, 
    addToFavorites, deleteFromFavorites, 
    favorite, favoriteItems, deleteMyAd, allImages
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
                    deleteMyAd={deleteMyAd}
                    allImages={allImages}
                />
            ))}
            </ul>
    )
}

export default ItemsContainer;