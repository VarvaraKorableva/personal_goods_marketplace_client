import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import OneAd from '../OneAd/OneAd'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/myPageData'
import * as Api from '../../Api/Api'

import './MyPage.css'
//allImages,
function MyPage({ allUserImages, onAdPopup, isLoggin, getMyItems, myAds, deleteMyAd, handleLogout, getItemById, addToFavorites, deleteFromFavorites, favorite, favoriteItems, limit, addAds, handleUpdateIsReserved}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

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

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    function onLogout() {
        handleLogout()
    }

    React.useEffect(() => {
        getMyItems(userId)
    }, []);

    function handleAddMoreAds() {
        addAds()
    }

    function handleAddAdClick() {
        onAdPopup()
      }

    return(
        <section>
            <div className="myPage__container">
                <div className="myPage__info-container">
                    <div className="myPage__avatar-container">
                        <div className="myPage__avatar">
                            <p className="myPage__avatar-info-text">{translatedContext.temporaryMessage}</p>
                        </div>
                        {/*<button className="myPage__btn">{translatedContext.changeAvatarBtn}</button>*/}
                    </div>
                    <div className="myPage__info-wrapper">
                        <p className="myPage__name">{currentUser.username}</p>
                        <p className="myPage__my-rating"></p>
                    </div>
                </div>
                <div className="myPage__listings-wrapper">
                    <h3 className="myPage__title">{translatedContext.myListingsTitle}</h3>
                    {myAds.length === 0?
                    <div className="myPage__add-ad-container">
                        <h3>{translatedContext.noAdsMessage}</h3>
                        <button className='myPage_add-announcement-btn' onClick={handleAddAdClick}>{translatedContext.addNewAdBtnName}</button>
                    </div>

                    :
                
                    <ul className="myPage-listings-container">
                        {myAds.slice(0, limit).map((item) => (
                            <OneAd 
                                key={item.item_id} 
                                item={item} 
                                deleteMyAd={deleteMyAd} 
                                isLoggin={isLoggin}
                                getItemById={getItemById}

                                addToFavorites={addToFavorites} 
                                deleteFromFavorites={deleteFromFavorites}
                                favorite={favorite}
                                favoriteItems={favoriteItems}
                                allImages={allUserImages}
                                handleUpdateIsReserved={handleUpdateIsReserved}
                            />
                        ))}
                    </ul>
                    }
                    {myAds.length <= limit?
                        <></>
                        :
                        <button className="myPage__btn" onClick={handleAddMoreAds}>{translatedContext.addMoreAdsBtn}</button>
                    }
                </div>

                {/*<div>
                    <h3>My reviews</h3>
                    <p>reviews</p>
                    <Link>See my reviews</Link>
                </div>
                <div>
                    <Link>Help</Link>
                </div>

                <div>
                    <Link>Edit profile information</Link>
                </div>

                <div>
                    <Link>Delete profile</Link>
                </div>*/}


                <button className="myPage__btn-logout" onClick={onLogout}>{translatedContext.logOutBtn}</button>


            </div>
        </section>
    )
}

export default MyPage;
