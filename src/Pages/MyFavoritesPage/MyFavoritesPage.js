import React from 'react'
import { useNavigate } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import OneFavCard from './OneFavCard/OneFavCard'
import "./MyFavoritesPage.css"
import {Link} from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/favoritesPageData'
import BackBtn from '../../UK-kit/BackBtn'
import { useItemsContext } from "../../contexts/ItemsContext";

function MyFavoritesPage({ deleteFromFavorites, favorite, favoriteItems}) {
    const currentUser = React.useContext(CurrentUserContext)
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

    const navigate = useNavigate()

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

    const goBack = () => {
      navigate(-1);
    };

    return(
        <div className="myFavoritesPage-main-container">
            <BackBtn/>
            <h3>{translatedContext.myFavoriteTitle}</h3>
            <ul className="myFavoritesPage-listings-container">
                {favorite.map((item) => (
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
                <p className="myFavoritesPage-back-btn">{translatedContext.goToHomePageBtn} &rarr;</p>
            </Link>
        </div>

    )
}

export default MyFavoritesPage;