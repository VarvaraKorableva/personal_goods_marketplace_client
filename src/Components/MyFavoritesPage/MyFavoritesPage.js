import React from 'react'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import OneFavCard from './OneFavCard/OneFavCard'
import "./MyFavoritesPage.css"
import {Link} from 'react-router-dom'

function MyFavoritesPage({getMyFavorites, favorite, lastFourtyItems}) {

    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id
    
    React.useEffect(() => {
        getMyFavorites(favorite_collector_id)
    },[])

    let result = lastFourtyItems.filter(obj1 => {
        // Проверяем, есть ли текущий идентификатор из первого массива во втором массиве
        return favorite.some(obj2 => obj1.item_id === obj2.item_id);
    });

    if(favorite.length === 0) {
        return <p>Loading ...</p>;
    }

    return(
        <div className="myFavoritesPage-main-container">
            <h2>My favorite</h2>
            <ul className="myFavoritesPage-listings-container">
                {result.map((item) => (
                    <OneFavCard 
                        key={item.item_id} 
                        item={item}
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