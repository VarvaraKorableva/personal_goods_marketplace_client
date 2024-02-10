import OneAd from '../../OneAd/OneAd'
import './ItemsContainer.css';

function ItemsContainer({lastFourtyItems, getItemById}) {
    return(
        <ul className="itemsContainer-listings-container">
            {lastFourtyItems.map((item) => (
                <OneAd key={item.item_id} item={item} getItemById={getItemById}/>
            ))}
        </ul>
    )
}

export default ItemsContainer;