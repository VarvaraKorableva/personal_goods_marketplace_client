import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import './CardPage.css'
import * as Api from '../../Api/Api'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/CardPageData'
import noPictures from '../../images/nopictures.png'

function CardPage({ allImages, deleteMyAd, selectedItem, getItemById, addToFavorites, isLoggin, favoriteItems, deleteFromFavorites, openFirstMessagePopup}) {
    let { item_id } = useParams();
    let {favorite_items_id} = useParams();
    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    const [userInfo, setUserInfo] = React.useState([])

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

    useEffect(() => {
        getItemById(item_id);
    }, []); 
    
    function getUser() {
        Api.getUserById(selectedItem[0].owner_id)
            .then((res) => {
                setUserInfo(res)
                console.log(res)
            })    
            .catch(error => console.error('Error fetching user:', error));
    }

    if(selectedItem.length === 0) {
        return <p>Loading ...</p>;
    } 

    function hundleDeleteMyAd() {
        deleteMyAd(selectedItem[0].item_id)
    }

    function handleAddToFavorites() {
        addToFavorites(favorite_collector_id, selectedItem[0].item_id, selectedItem[0])
    }

    function hundleDeleteFromFavorites() {
        deleteFromFavorites(selectedItem[0])
    }

    function handleAddMessage() {
        openFirstMessagePopup()
    }

    const isLiked = favoriteItems.some((i) => i.item_id === selectedItem[0].item_id)
    const image = allImages.filter((img) => img.item_id === selectedItem[0].item_id)

    return(
        <section className="cardPage-section">
            <div className="cardPage-main-container">
                <div className="cardPage-container">


                <div className="cardPage__main-pic-wrapper">
                    {image.length?
                        <img className="cardPage__main-pic" alt = {selectedItem.title} src={image[0].location}></img>
                    : 
                        <img className="cardPage__no-pic" alt = 'no pic' src={noPictures}></img>
                    }
                </div>

                    <div className="cardPage-info-container">
                        <div className="cardPage-info-wrapper">
                            <p className="cardPage-info-title">{translatedContext.name}: <span className="cardPage-info">{selectedItem[0].title}</span></p>
                            <p className="cardPage-info-title">{translatedContext.price}: <span className="cardPage-info">{selectedItem[0].price}</span></p>
                            <p className="cardPage-info-title">{translatedContext.city}: <span className="cardPage-info">{selectedItem[0].city}</span></p>
                        </div>

                        <div className="cardPage__info-about-user">
                            <Link to={`/users/${selectedItem[0].owner_id}`} className="cardPage-link">{translatedContext.seeAllUserAds} &rarr;</Link>                       
                        </div>
                        {
                            isLoggin?
                                <div className="cardPage__btn-container">
                                    {currentUser.user_id === selectedItem[0].owner_id ?
                                        <button className='cardPage__write-message-btn' onClick={hundleDeleteMyAd}>{translatedContext.deleteBtn}</button>
                                    
                                    :
                                        <>
                                        {isLiked? 
                                    
                                           <button onClick={hundleDeleteFromFavorites} className='cardPage__favorite-btn'>{translatedContext.deleteFromFavBtn}</button>
                                        :
                                           <button onClick={handleAddToFavorites} className='cardPage__favorite-btn'>{translatedContext.addToFavBtn}</button>
                                        }
                                    
                                        <button className='cardPage__write-message-btn' onClick={handleAddMessage}>{translatedContext.writeAMessageBtn}</button>
                                        </>
                                    }
                                </div>
                            :
                            <></>
                        }

                    </div>
                </div>
                {selectedItem[0].description.length <= 0 ? 
                <></> 
                :
                <div className="cardPage-description-container">
                    <p className="cardPage-info">{translatedContext.description}:</p>
                    <p className="cardPage-info-description">{selectedItem[0].description}</p>
                </div>
                }
            </div>
        </section>
    );
}

export default CardPage;
