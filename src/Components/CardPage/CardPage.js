import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import './CardPage.css'

function CardPage({ selectedItem, getItemById, getUserById, userInfo, addToFavorites }) {
    let { item_id } = useParams();
    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    useEffect(() => {
        getItemById(item_id)
    }, []); 


    if(selectedItem.length === 0) {
        return <p>Loading ...</p>;
    } 

    function handleAddToFavorites() {
        addToFavorites(favorite_collector_id, item_id, selectedItem)
    }


    //getUserById(selectedItem[0].owner_id)

    return(
        <section className="cardPage-section">
            <div className="cardPage-main-container">
            <div className="cardPage-container">
                <div className="cardPage-img-container">
                    <img alt={selectedItem[0].title}></img>
                </div>

                <div className="cardPage-info-container">
                    <div>
                        <p>Name: <span className="cardPage-info">{selectedItem[0].title}</span></p>
                        <p>Price: <span className="cardPage-info">{selectedItem[0].price}</span></p>
                        <p>City: <span className="cardPage-info">{selectedItem[0].city}</span></p>
                    </div>

                    <div className="cardPage__info-about-user">
                        <p>Saller: {userInfo.username}</p>
                        
                        <Link to={`/users/${selectedItem[0].owner_id}`} className="cardPage-link">See all user ads &rarr;</Link>
                    </div>

                    <div className="cardPage__btn-container">
                        <button onClick={handleAddToFavorites} className='cardPage__favorite-btn'>Add to favorites</button>
                        <button className='cardPage__write-message-btn'>Write a message</button>
                    </div>
                </div>
            </div>
            <p><span className="cardPage-info">Description:</span> {selectedItem[0].description}</p>
            </div>
        </section>
    );
}

export default CardPage;
///users/${userId}