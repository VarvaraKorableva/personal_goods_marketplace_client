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
import BackBtn from '../../UK-kit/BackBtn'
import { useFavorites } from "../../contexts/FavoritesContext"
import { useItemsContext } from "../../contexts/ItemsContext"
import Button from '../../UK-kit/Button/Button'

function CardPage({ openEditPopup, openDeletePopup, getItemById, addToFavorites, isLoggin, deleteFromFavorites, openFirstMessagePopup}) {
    let { item_id } = useParams();
    const navigate = useNavigate()
    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

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
        myImages,
        setMyImages,
        selectedItem,
        setSelectedItem,
      } = useItemsContext();

    const {
        favorite, 
        setFavorite, 
        favoriteItems,
        setFavoriteItems
    } = useFavorites();

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

    if(selectedItem.length === 0) {
        return <p>Loading ...</p>;
    } 

    function hundleDeleteMyAd() {
        openDeletePopup(selectedItem[0].item_id)
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

    const isLiked = favorite.some((i) => i.item_id === selectedItem[0].item_id)
    return(
        <section className="cardPage-section">
            
            <div className="cardPage-main-container">
                <BackBtn/>
                <div className="cardPage-container">

                <ul className="cardPage__main-pic-wrapper">
                    {selectedItem[0].images?
                        (
                            selectedItem[0].images.map((i, index) => (
                                <li key={index} className="cardPage__main-pic-container">
                                    <img className="cardPage__main-pic" alt = {selectedItem.title} src={i}></img>
                                </li>
                            ))
                        )
                    : 
                        <li className="cardPage__main-pic-wrapper">
                            <img className="cardPage__no-pic" alt = 'no pic' src={noPictures}></img>
                        </li>
                    }
                </ul>

                    <div className="cardPage-info-container">
                        <div className="cardPage-info-wrapper">
                            {selectedItem[0].reserved?
                                <Button className="cardPage-res-btn">Зарезервировано</Button>
                            :
                                <></>
                            }
                            <p className="cardPage-info-title">{translatedContext.name}: <span className="cardPage-info">{selectedItem[0].title}</span></p>
                            <p className="cardPage-info-title">{translatedContext.category}: <span className="cardPage-info">{selectedItem[0].parent_category_name_rus}</span></p>
                            
                            {selectedItem[0].condition.length?
                                <div className="cardPage-info-edit-container">
                                    {isLoggin && currentUser.user_id === selectedItem[0].owner_id?
                                        <button className="cardPage-edit-btn" onClick={handleOpenConditionEditPopup}>
                                            <TbEdit className="cardPage-edit-icon"/>
                                        </button>
                                        :
                                        <></>
                                    }
                                    <p className="cardPage-info-title">{translatedContext.condition}: <span className="cardPage-info">{selectedItem[0].condition}</span></p>
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


                            <p className="cardPage-info-title">{translatedContext.seller}: <Link to={`/users/${selectedItem[0].owner_id}`} className="cardPage-link">{selectedItem[0].owner_name}</Link></p>
                            
                            {
                            isLoggin && currentUser.user_id === selectedItem[0].owner_id ?
                                <></>
                            :
                            <Button className="cardPage__info-about-user">
                                <Link to={`/users/${selectedItem[0].owner_id}`} className="cardPage-link">{translatedContext.seeAllUserAds} &rarr;</Link>                       
                            </Button>
                            }


                                {selectedItem[0].owner_telegram && selectedItem[0].owner_telegram !== currentUser.telegram && (
                                <a
                                    className="btn"
                                    href={`https://t.me/${selectedItem[0].owner_telegram.replace(/^@/, '').replace(/\s+/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {translatedContext.btn.messageTheSellerOnTelegram}
                                </a>
                                )}



                        </div>
                        {
                            isLoggin?
                                <div className="cardPage__btn-container">
                                    {currentUser.user_id === selectedItem[0].owner_id ?
                                        <>
                                        
                                        {/*<button className='cardPage__write-message-btn' onClick={hundleDeleteMyAd}>{translatedContext.deleteBtn}</button>*/}
                                        </>
                                    
                                    :
                                        <div className="cardPage__btn-container">
                                        {isLiked? 
                                    
                                           <Button onClick={hundleDeleteFromFavorites} >{translatedContext.btn.deleteFromFavBtn}</Button>
                                        :
                                           <Button onClick={handleAddToFavorites} >{translatedContext.btn.addToFavBtn}</Button>
                                        }
                                    
                                        <Button  onClick={handleAddMessagePopupOpen}>{translatedContext.btn.writeAMessageBtn}</Button>
                                        </div>
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
                            <p className="cardPage-add-description">{translatedContext.addDescription}</p>
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
