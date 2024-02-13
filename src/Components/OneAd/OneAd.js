import React from 'react'
//import { useParams } from 'react-router-dom'
import './OneAd.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom'
//Написать если isLoggin фалс то при нажатии на лайк редирект на страницу логина

function OneAd({isLoggin, item, getItemById, deleteMyAd, addToFavorites, deleteFromFavorites, favorite, favoriteItems}) {
    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    //const isOwn = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    //const isLiked = favoriteItems.some((i) => i.id === item.item_id)
    //console.log(favoriteItems)

    function handleClick() {
        //onItemClick(item)
        getItemById(item.item_id)
    }

    function handleAddToFavourite() {
        addToFavorites(favorite_collector_id, item.item_id, item)
    }
/*
    function handleDeleteFromfavorite() {
        deleteFromFavorites()
    }*/

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
            return `Posted today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        }
    
        // Получаем дату вчерашнего дня
        const yesterday = new Date(formattedCurrentDate);
        yesterday.setDate(formattedCurrentDate.getDate() - 1);
    
        // Если дата равна вчерашней дате, выводим "вчера"
        if (formattedDate.getTime() === yesterday.getTime()) {
            return `posted yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        }
    
        // Иначе выводим полную дату
        const formattedDateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return `posted ${formattedDateString}`;
    }
    
    // Пример использования
    //const itemCreatedAt = "2024-02-09T07:04:05.187Z"; // Полученное время из базы данных
    const formattedTime = formatDate(item.created_at)

    return(
        <li className="oneAdd__container">
            <div>
                <img className="oneAdd__main-pic" alt = {item.title}></img>
            </div>
            
            <div className="oneAdd__text-container">
                <div className="oneAdd__title-and-like-container">
                    <Link to={`/items/${item.item_id}`} className="oneAdd__title" onClick={handleClick}>{item.title}</Link>
                    {currentUser.user_id === item.owner_id ?
                        <button className="oneAdd__delete-btn" onClick={handleDeleteMyitem}></button>
                        :
                        <button className="oneAdd__like-btn" onClick={handleAddToFavourite}></button>
                    }
                </div>
                <p className="oneAdd__price">{item.price}</p>
                <p className="oneAdd__city">{item.city}</p>
                <p className="oneAdd__time">{formattedTime}</p>
            </div>

        </li>
    )
}

export default OneAd;