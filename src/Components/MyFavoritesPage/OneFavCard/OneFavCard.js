import './OneFavCard.css'
import { Link } from 'react-router-dom'
import React from 'react'

function OneFavCard({item, deleteFromFavorites, favorite}) {

    if(favorite.length === 0) {
        return <p>Loading ...</p>;
    }

    let favorite_items_id = favorite.filter((f) => f.item_id === item.item_id)[0].favorite_items_id

    function handleDeleteFavorite() {
        deleteFromFavorites(favorite_items_id)
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
    
    return (
        <li className="oneAdd__container">
            <div>
                <img className="oneAdd__main-pic" alt = {item.title}></img>
            </div>
            
            <div className="oneAdd__text-container">
                <div className="oneAdd__title-and-like-container">
                    <Link to={`/items/${item.item_id}`} className="oneAdd__title">{item.title}</Link>
                        <button className="oneAdd__delete-btn" onClick={handleDeleteFavorite}></button>
                </div>
                <p className="oneAdd__price">{item.price}</p>
                <p className="oneAdd__city">{item.city}</p>
                <p className="oneAdd__time">{formattedTime}</p>
            </div>

        </li>
    )
}

export default OneFavCard;