import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';
import { useItemsContext } from "../../../contexts/ItemsContext";
import { useFavorites } from "../../../contexts/FavoritesContext"
import Container from '../../../UK-kit/Container/Container'

function ItemsContainer({
    isLoggin,
    getItemById, 
    addToFavorites, deleteFromFavorites, 
    openDeletePopup, openFirstMessagePopup, handleUpdateIsReserved, updateItemCity,
}) {

    
    const {
        favorite, 
    } = useFavorites();

    const {
        itemsAfterSearch,
      } = useItemsContext();

    return(
        <Container as='ul' baseClassName='listings-container'>
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
        </Container>
    )
}

export default ItemsContainer;