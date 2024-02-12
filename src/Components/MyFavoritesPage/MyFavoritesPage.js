import React from 'react'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import OneFavCard from './OneFavCard/OneFavCard'
import "./MyFavoritesPage.css"
import {Link} from 'react-router-dom'

function MyFavoritesPage({getMyFavorites, deleteFromFavorites, favorite, lastFourtyItems}) {
    
    const [favoriteItems, setFavoriteItems] = React.useState([])

    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    React.useEffect(() => {
        const favoriteItemsResult = lastFourtyItems.filter(item =>
          favorite.some(favoriteItem => favoriteItem.item_id === item.item_id)
        );
        setFavoriteItems(favoriteItemsResult);
      }, [lastFourtyItems, favorite]);
    
    React.useEffect(() => {
        getMyFavorites(favorite_collector_id)
    },[])

    if(favorite.length === 0) {
        return <p>Loading ...</p>;
    }

    return(
        <div className="myFavoritesPage-main-container">
            <h2>My favorite</h2>
            <ul className="myFavoritesPage-listings-container">
                {favoriteItems.map((item) => (
                    <OneFavCard 
                        key={item.item_id} 
                        item={item}
                        deleteFromFavorites={deleteFromFavorites}
                        favoriteItems={favoriteItems}
                        favorite={favorite}
                    />
                ))}
            </ul>
            <Link to="/" className='myFavoritesPage-link'>
                <p>To the home page &rarr;</p>
            </Link>
        </div>

    )
}

export default MyFavoritesPage;