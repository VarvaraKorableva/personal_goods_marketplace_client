import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import './CardPage.css'
import * as Api from '../../Api/Api'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/CardPageData'
import noPictures from '../../images/nopictures.png'
import ImageSlider from './ImageSlider.js'
import { TbEdit } from "react-icons/tb";

function CardPage({ openEditPopup, deleteMyAd, selectedItem, getItemById, addToFavorites, isLoggin, favoriteItems, deleteFromFavorites, openFirstMessagePopup}) {
    let { item_id } = useParams();
    const navigate = useNavigate()
    //let {favorite_items_id} = useParams();
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
        //getAllImagesByItemId(item_id)
    }, []); 

    const goBack = () => {
        navigate(-1);
    };
    
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

    function handleAddMessagePopupOpen() {
        openFirstMessagePopup(selectedItem[0].owner_id, selectedItem[0].item_id)
    }

    function handleOpenConditionEditPopup() {
        openEditPopup(selectedItem[0].item_id, "condition")
    }

    function handleOpenPriceEditPopup() {
        openEditPopup(selectedItem[0].item_id, "price")
    }

    function handleOpenCityEditPopup() {
        openEditPopup(selectedItem[0].item_id, "city")
    }

    function handleOpenDescriptionEditPopup() {
        openEditPopup(selectedItem[0].item_id, "description")
    }

    const isLiked = favoriteItems.some((i) => i.item_id === selectedItem[0].item_id)

    return(
        <section className="cardPage-section">
            <p className='back-btn' onClick={goBack}>← Назад</p>
            <div className="cardPage-main-container">
                <div className="cardPage-container">

                <div className="cardPage__main-pic-wrapper">
                    {selectedItem[0].images?
                        selectedItem[0].images.length > 1?
                        <ImageSlider 
                            allImagesForOneItem={selectedItem[0].images}>
                        </ImageSlider>
                        : 
                        <img className="cardPage__main-pic" alt = {selectedItem.title} src={selectedItem[0].images[0]}></img>
                    : 
                        <img className="cardPage__no-pic" alt = 'no pic' src={noPictures}></img>
                    }
                </div>

                    <div className="cardPage-info-container">
                        <div className="cardPage-info-wrapper">
                            {selectedItem[0].reserved?
                                <p className="cardPage__reserved-text">Зарезервировано</p>
                            :
                                <></>
                            }
                            <p className="cardPage-info-title">{translatedContext.name}: <span className="cardPage-info">{selectedItem[0].title}</span></p>
                            {selectedItem[0].condition.length?
                                <div className="cardPage-info-edit-container">
                                    {isLoggin && currentUser.user_id === selectedItem[0].owner_id?
                                        <button className="cardPage-edit-btn" onClick={handleOpenConditionEditPopup}>
                                            <TbEdit className="cardPage-edit-icon"/>
                                        </button>
                                        :
                                        <></>
                                    }
                                    <p className="cardPage-info-title">Состояние: <span className="cardPage-info">{selectedItem[0].condition}</span></p>
                                </div>
                            : 
                                <></>
                            }
                            <div className="cardPage-info-edit-container">
                                {isLoggin && currentUser.user_id === selectedItem[0].owner_id?
                                    <button className="cardPage-edit-btn" onClick={handleOpenPriceEditPopup}>
                                        <TbEdit className="cardPage-edit-icon"/>
                                    </button>
                                    :
                                    <></>
                                }
                                <p className="cardPage-info-title">{translatedContext.price}: <span className="cardPage-info">{selectedItem[0].price} ₪</span></p>
                            </div>

                            <div className="cardPage-info-edit-container">
                                {isLoggin && currentUser.user_id === selectedItem[0].owner_id?
                                    <button className="cardPage-edit-btn" onClick={handleOpenCityEditPopup}>
                                        <TbEdit className="cardPage-edit-icon"/>
                                    </button>
                                    :
                                    <></>
                                }
                                <p className="cardPage-info-title">{translatedContext.city}: <span className="cardPage-info">{selectedItem[0].city}</span></p>
                            </div>
                            
                        </div>
                        {
                            isLoggin && currentUser.user_id === selectedItem[0].owner_id ?
                                <></>
                            :
                            <div className="cardPage__info-about-user">
                                <Link to={`/users/${selectedItem[0].owner_id}`} className="cardPage-link">{translatedContext.seeAllUserAds} &rarr;</Link>                       
                            </div>
                        }
                        {
                            isLoggin?
                                <div className="cardPage__btn-container">
                                    {currentUser.user_id === selectedItem[0].owner_id ?
                                        <>
                                        
                                        {/*<button className='cardPage__write-message-btn' onClick={hundleDeleteMyAd}>{translatedContext.deleteBtn}</button>*/}
                                        </>
                                    
                                    :
                                        <>
                                        {isLiked? 
                                    
                                           <button onClick={hundleDeleteFromFavorites} className='cardPage__favorite-btn'>{translatedContext.deleteFromFavBtn}</button>
                                        :
                                           <button onClick={handleAddToFavorites} className='cardPage__favorite-btn'>{translatedContext.addToFavBtn}</button>
                                        }
                                    
                                        <button className='cardPage__write-message-btn' onClick={handleAddMessagePopupOpen}>{translatedContext.writeAMessageBtn}</button>
                                        </>
                                    }
                                </div>
                            :
                            <></>
                        }

                    </div>
                </div>
                {selectedItem[0].description.length <= 0 ? 
                 (
                    isLoggin && currentUser.user_id === selectedItem[0].owner_id?
                        <button className="cardPage-edit-btn-description" onClick={handleOpenDescriptionEditPopup}>
                            <TbEdit className="cardPage-edit-icon"/>
                            <p className="cardPage-add-description">Добавить описание</p>
                        </button>

                        :
                        <></>
                    
                 ) 
                :
                <div className="cardPage-description-container">
                    <div className="cardPage-info-edit-container">
                        {isLoggin && currentUser.user_id === selectedItem[0].owner_id?
                            <button className="cardPage-edit-btn-description" onClick={handleOpenDescriptionEditPopup}>
                                <TbEdit className="cardPage-edit-icon"/>
                            </button>
                            :
                            <></>
                        }
                        <p className="cardPage-info">{translatedContext.description}:</p>
                    </div>
                    <p className="cardPage-info-description">{selectedItem[0].description}</p>
                </div>
                }
            </div>
        </section>
    );
}

export default CardPage;
