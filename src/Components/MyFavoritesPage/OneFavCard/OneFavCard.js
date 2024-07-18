import './OneFavCard.css'
import { Link } from 'react-router-dom'
import React from 'react'
import noPictures from '../../../images/nopictures.png'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/Timing'

function OneFavCard({item, deleteFromFavorites, favorite, allImages}) {

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
        return <p>Loading ...</p>;
    }

    const image = allImages.filter((img) => img.item_id === item.item_id)

    function handleDeleteFavorite() {
        deleteFromFavorites(item)//item_id
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
    
    return (
        <li className="OneFavCard__container">

            <div className="OneFavCard__wrapper">
            <div className="OneFavCard__main-pic-wrapper">
                {image.location?
                  <img className="OneFavCard__main-pic" alt = {item.title} src={image[0].location}></img>
                : 
                  <img className="OneFavCard__no-pic" alt = 'no pic' src={noPictures}></img>
                }
            </div>
            
            <div className="OneFavCard__text-container">
                <div className="OneFavCard__title-and-like-container">
                    <Link to={`/items/${item.item_id}`} className="oneAdd__title">{item.title}</Link>
                </div>
                <p className="OneFavCard__price">{item.price}</p>
                <p className="OneFavCard__city">{item.city}</p>
                
            </div>
            </div>
            <div className="OneFavCard__time-and-delete-container">
                <p className="OneFavCard__time">{formattedTime}</p>
                <button className="OneFavCard__delete-btn" onClick={handleDeleteFavorite}></button>
            </div>

        </li>
    )
}

export default OneFavCard;