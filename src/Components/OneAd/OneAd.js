import React from 'react'
//import { useParams } from 'react-router-dom'
import './OneAd.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom'
import noPictures from '../../images/nopictures.png'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Timing'

function OneAd({
    isLoggin, item, getItemById, 
    deleteMyAd, addToFavorites, 
    deleteFromFavorites, favorite, 
    favoriteItems, allImages, openFirstMessagePopup,
}) {

    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    const isLiked = favoriteItems.some((i) => i.item_id === item.item_id)

    const image = allImages.filter((img) => img.item_id === item.item_id)

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
      openFirstMessagePopup()
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
        deleteMyAd(item.item_id)
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const currentDate = new Date();
    
        // Получаем даты без времени
        const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const formattedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
        // Если дата равна текущей дате, выводим "сегодня"
        if (formattedDate.getTime() === formattedCurrentDate.getTime()) {
            return `${translatedContext.postedToday} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        }
    
        // Получаем дату вчерашнего дня
        const yesterday = new Date(formattedCurrentDate);
        yesterday.setDate(formattedCurrentDate.getDate() - 1);
    
        // Если дата равна вчерашней дате, выводим "вчера"
        if (formattedDate.getTime() === yesterday.getTime()) {
            return `${translatedContext.postedYesterday} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        }
    
        // Иначе выводим полную дату
        const formattedDateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return `${translatedContext.posted} ${formattedDateString}`;
    }
    
    // Пример использования
    //const itemCreatedAt = "2024-02-09T07:04:05.187Z"; // Полученное время из базы данных
    const formattedTime = formatDate(item.created_at)
    const strTitle = item.title
    const strCity = item.city

    return(
        <li className="oneAdd__container">

            {item.price > 0?
              <></>
            :
              <div className="oneAdd__badge-free">{translatedContext.free}</div>  
            }
            
            <Link to={`/items/${item.item_id}`} className="oneAdd__title" onClick={handleClick}>{strTitle[0].toUpperCase() + strTitle.slice(1)}</Link>
            <div className="oneAdd__pic-and-info-container">
            <div className="oneAdd__main-pic-wrapper">
                {image.length?
                  <img className="oneAdd__main-pic" alt = {item.title} src={image[0].location}></img>
                : 
                  <img className="oneAdd__no-pic" alt = 'no pic' src={noPictures}></img>
                }
            </div>
            
            <div className="oneAdd__text-container">
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
                <p className="oneAdd__city">{strCity[0].toUpperCase() + strCity.slice(1)}</p>
                {isLoggin && (currentUser.user_id !== item.owner_id) ?
                    <button className="oneAdd__btn" onClick={handleAddMessagePopupOpen}>
                      <div className="oneAdd__message-btn"></div>
                      <p className="oneAdd__message-btn-text">Написать владельцу</p>
                    </button>
                  :
                    <></>
                }
                
            </div>
            </div>
            <p className="oneAdd__time">{formattedTime}</p>

        </li>
    )
}

export default OneAd;