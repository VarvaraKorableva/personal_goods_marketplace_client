import React from 'react'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import OneFavCard from './OneFavCard/OneFavCard'
import "./MyFavoritesPage.css"
import {Link} from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/favoritesPageData'


function MyFavoritesPage({allImages, getMyFavorites, deleteFromFavorites, favorite, lastFourtyItems, favoriteItems}) {

    const currentUser = React.useContext(CurrentUserContext)

    const { language } = React.useContext(LanguageContext)

    const { en, rus, hebrew } = choose;
  
    let translatedContext = '';
    if (language === 'en') {
      translatedContext = en;
    } else if (language === 'rus') {
      translatedContext = rus;
    } else if (language === 'hebrew') {
      translatedContext = hebrew;
    }

    if(favorite.length === 0) {
        return  <div className="myFavoritesPage-main-container_empty">
                  <p>{translatedContext.nothingAddedMessage}</p>
                  <Link to={`/`} className='myFavoritesPage-link'>
                    <p className="myFavoritesPage-back-btn">{translatedContext.goToHomePageBtn} &rarr;</p>
                  </Link>
                </div>;
    }

    return(
        <div className="myFavoritesPage-main-container">
            <h2>{translatedContext.myFavoriteTitle}</h2>
            <ul className="myFavoritesPage-listings-container">
                {favoriteItems.map((item) => (
                    <OneFavCard 
                        key={item.item_id} 
                        item={item}
                        deleteFromFavorites={deleteFromFavorites}
                        favoriteItems={favoriteItems}
                        favorite={favorite}
                        allImages={allImages}
                    />
                ))}
            </ul>
            <Link to="/" className='myFavoritesPage-link'>
                <p className="myFavoritesPage-back-btn">{translatedContext.goToHomePageBtn} &rarr;</p>
            </Link>
        </div>

    )
}

export default MyFavoritesPage;
/* 
if(favorite_collector_id) {
        React.useEffect(() => {
        const favoriteItemsResult = lastFourtyItems.filter(item =>
          favorite.some(favoriteItem => favoriteItem.item_id === item.item_id)
        );
        setFavoriteItems(favoriteItemsResult);
      }, [lastFourtyItems, favorite]);
    
    React.useEffect(() => {
        getMyFavorites(favorite_collector_id)
    },[favorite_collector_id])
}
*/