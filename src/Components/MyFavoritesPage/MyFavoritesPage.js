import React from 'react'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function MyFavoritesPage({getMyFavorites,favorite}) {

    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id
    console.log(favorite_collector_id)
    React.useEffect(() => {
        getMyFavorites(favorite_collector_id)
    },[])

    console.log(favorite)

    if(favorite.length === 0) {
        return <p>Loading ...</p>;
    }

    return(
        <ul>
            {favorite.map((item) => (
                <li key={item.favorite_items_id}>{item.name}</li>
            ))}
        </ul>
    )
}

export default MyFavoritesPage;