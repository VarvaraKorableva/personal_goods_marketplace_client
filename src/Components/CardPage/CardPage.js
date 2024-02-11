import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import './CardPage.css'

function CardPage({ selectedItem, getItemById, getUserById, userInfo, addToFavorites }) {
    let { item_id } = useParams();
    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    useEffect(() => {
        getItemById(item_id);
        //getUserById(selectedItem[0].owner_id)
    }, []);//item_id

    if(selectedItem.length === 0) {
        return <p>Loading ...</p>;
    }

    function handleAddToFavorites() {
        addToFavorites(favorite_collector_id, item_id)
    }

    return(
        <section>
            <div className="cardPage-container">
                <div className="cardPage-img-container">
                    <img alt={selectedItem[0].title}></img>
                </div>

                <div className="cardPage-info-container">
                    <div>
                        <p>{selectedItem[0].title}</p>
                        <p>{selectedItem[0].price}</p>
                        <p>{selectedItem[0].city}</p>
                    </div>
                
                
                    <div>
                        <button onClick={handleAddToFavorites} className='cardPage__favorite-btn'>Add to favorites</button>
                        <button className='cardPage__write-message-btn'>Write a message</button>
                    </div>

                    <div className="cardPage__info-about-user">
                        <p>Seller</p>
                        <p>Reviews</p>
                        <Link to={`/users/${selectedItem[0].owner_id}`}>See all user ads</Link>
                    </div>
                </div>
            </div>
            <p>{selectedItem[0].description}</p>
        </section>
    );
}

export default CardPage;
///users/${userId}