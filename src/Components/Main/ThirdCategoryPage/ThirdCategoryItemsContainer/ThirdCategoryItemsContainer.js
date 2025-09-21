////ThirdCategoryItemsContainer

/*import OneAd from '../../../OneAd/OneAd'
import './ThirdCategoryItemsContainer.css';
import { useItemsContext } from "../../contexts/ItemsContext";

function ThirdCategoryItemsContainer({ getItemById, addToFavorites, deleteFromFavorites, favorite }) {
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

export default ThirdCategoryItemsContainer;*/