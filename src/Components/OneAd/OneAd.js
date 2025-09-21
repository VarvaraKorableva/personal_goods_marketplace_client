import React from 'react'
import './OneAd.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom'
import noPictures from '../../images/nopictures.png'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Timing'
//import { useItemsContext } from "../../contexts/ItemsContext";
import { useFavorites } from "../../contexts/FavoritesContext"
import Button from '../../UK-kit/Button/Button'

function OneAd({
    isLoggin, item, getItemById, 
    openDeletePopup, addToFavorites, 
    deleteFromFavorites,
    openFirstMessagePopup, handleUpdateIsReserved,
}) {
  
    const {
      favorite, 
      setFavorite, 
      favoriteItems,
      setFavoriteItems
    } = useFavorites();
    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    const isLiked = favorite.some((i) => i.item_id === item.item_id)

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

    function handleAddMessagePopupOpen() {
      openFirstMessagePopup(item.owner_id, item.item_id)
    }
    
    function handleClick() {
        getItemById(item.item_id)
    }

    function handleAddToFavourite() {
        addToFavorites(favorite_collector_id, item.item_id, item)
    }

    function handleDeleteFromFav() {
        deleteFromFavorites(item)
    }

    function handleDeleteMyitem() {
      openDeletePopup(item.item_id)
    }

    function onUpdateIsReserved() {
      handleUpdateIsReserved(item.item_id)
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const currentDate = new Date();
    
        // Получаем даты без времени
        const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const formattedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
        // Если дата равна текущей дате, выводим "сегодня"
        if (formattedDate.getTime() === formattedCurrentDate.getTime()) {
            return `${translatedContext.postedToday}`;
        }
    
        // Получаем дату вчерашнего дня
        const yesterday = new Date(formattedCurrentDate);
        yesterday.setDate(formattedCurrentDate.getDate() - 1);
    
        // Если дата равна вчерашней дате, выводим "вчера"
        if (formattedDate.getTime() === yesterday.getTime()) {
            return `${translatedContext.postedYesterday}`;
        }
    
        // Иначе выводим полную дату
        const formattedDateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return `${translatedContext.posted} ${formattedDateString}`;
    }
    
    // Пример использования
    //const itemCreatedAt = "2024-02-09T07:04:05.187Z"; // Полученное время из базы данных
    const formattedTime = formatDate(item.created_at)

    return(
        <li className="oneAdd__container">
          
            {item.price > 0?
              <></>
            :
              <div className="oneAdd__badge-free">{translatedContext.free}</div>  
            }
            
              <Link to={`/items/${item.item_id}`} className="oneAdd__main-pic-wrapper">
                <>
                {item.images?
                  <img className="oneAdd__main-pic" alt = {item.title} src={item.images[0]}></img>
                : 
                  <img className="oneAdd__no-pic" alt = 'no pic' src={noPictures}></img>
                }
                {isLoggin && (currentUser.user_id !== item.owner_id) && item.reserved ?
                    <p className='oneAdd__reserved-text'>Зарезервировано</p>
                    :
                    <></>
                }
                </>
              </Link>
            <div className="oneAdd__pic-and-info-container"> 
            
              <div className="oneAdd__text-container">
              <Link to={`/items/${item.item_id}`} className="oneAdd__title" onClick={handleClick}>{item.title}</Link>
              
                <div className="oneAdd__title-and-like-container">
                    {isLoggin? 
                        (currentUser.user_id === item.owner_id ?
                          <button className="oneAdd__delete-btn" onClick={handleDeleteMyitem}></button>
                        :
                          (isLiked ?
                            <button className="oneAdd__like-btn_activ" onClick={handleDeleteFromFav}></button>
                          :
                            <button className="oneAdd__like-btn" onClick={handleAddToFavourite}></button>
                          )
                        
                        )
                    : <></>}
                </div>
                <p className="oneAdd__price">{item.price} ₪</p>
                <p className="oneAdd__city">{item.city}</p>

                {/*
                  isLoggin?
                    (currentUser.user_id !== item.owner_id) ?
                        <div className="oneAdd__container-msg-text">
                          {item.reserved?
                           <p className="oneAdd__reserved-text">Зарезервировано</p>
                          :
                           <></>
                          }
                          <button className="oneAdd__btn" onClick={handleAddMessagePopupOpen}>
                            Написать владельцу
                          </button>
                        </div>
                      :
                        <button className="oneAdd__btn">
                          Продвинуть объявление
                        </button> 
                  :
                    <></>
                        */}
                
            </div>
            </div>
            <p className="oneAdd__time">{formattedTime}</p>

        </li>
    )
}

export default OneAd;