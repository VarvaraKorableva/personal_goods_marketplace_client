import React from 'react'
import OneAd from '../OneAd/OneAd'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/myPageData'
import BackBtn from '../../UK-kit/BackBtn'
import './MyPage.css'
import Button from '../../UK-kit/Button/Button'
import { TbEdit } from "react-icons/tb";

function MyPage({openEditPopup, onAdPopup, isLoggin, getMyItems, myAds, openDeletePopup, getItemById, addToFavorites, deleteFromFavorites, limit, addAds, handleUpdateIsReserved}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id
    const [isWhyImportantClicked, setIsWhyImportantClicked] = React.useState(false)
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
/*
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);*/

    React.useEffect(() => {
        getMyItems(userId)
    }, []);

    function showTelergamInfo() {
        setIsWhyImportantClicked(!isWhyImportantClicked)
    }
    function handleAddMoreAds() {
        addAds()
    }

    function handleAddAdClick() {
        onAdPopup()
    }

    function openAddTelegramPopup() {
        openEditPopup(userId, "telegram")
    }
//Неактивные объявления
//Активные Объявления
    return(
        <section>
            <BackBtn/>
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
                        {currentUser.telegram?
                            <button className="myPage__btn-container">
                                <TbEdit className="cardPage-edit-icon" onClick={openAddTelegramPopup}/>
                                <p className="myPage__name font">{currentUser.telegram}</p>
                            </button>
                            
                        :
                            <>
                            <button className="btn" onClick={openAddTelegramPopup}>{translatedContext.btnNames.addTelegram}</button>
                            <button onClick={showTelergamInfo} className="myPage__infoBtn">{translatedContext.btnNames.whyDoesThisMatter}</button>

                            {isWhyImportantClicked? 
                                <p className="myPage__name">{translatedContext.whyAddTelegramIsImportant}</p>
                            :
                                <></>
                            }

                            </>
                        }
                        <p className="myPage__my-rating"></p>
                    </div>
                </div>
                <div className="myPage__listings-wrapper">
                    <h3 className="myPage__title">{translatedContext.myListingsTitle}({myAds.length}):</h3>
                    {myAds.length === 0?
                    <div className="myPage__add-ad-container">
                        <h3 className='myPage__noAdsMessage'>{translatedContext.noAdsMessage}</h3>
                        <button className='btn' onClick={handleAddAdClick}>{translatedContext.addNewAdBtnName}</button>
                    </div>

                    :
                    <>
                    <button className='myPage_add-new-ad-btn' onClick={handleAddAdClick}>{translatedContext.addNewAdBtnName}</button>
                    
                    <ul className="myPage-listings-container">
                        {myAds.slice(0, limit).map((item) => (
                            <OneAd 
                                key={item.item_id} 
                                item={item} 
                                openDeletePopup={openDeletePopup} 
                                isLoggin={isLoggin}
                                getItemById={getItemById}

                                addToFavorites={addToFavorites} 
                                deleteFromFavorites={deleteFromFavorites}
                                
                                handleUpdateIsReserved={handleUpdateIsReserved}
                            />
                        ))}
                    </ul>
                    </>
                    }
                    {myAds.length <= limit?
                        <></>
                        :
                        <button className="btn" onClick={handleAddMoreAds}>{translatedContext.addMoreAdsBtn}</button>
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
                */}


            </div>
        </section>
    )
}

export default MyPage;
