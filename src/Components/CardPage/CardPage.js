import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import './CardPage.css'
import * as Api from '../../Api/Api'

function CardPage({ selectedItem, getItemById, addToFavorites, isLoggin }) {
    let { item_id } = useParams();
    const currentUser = React.useContext(CurrentUserContext)
    const favorite_collector_id = currentUser.user_id

    const [userInfo, setUserInfo] = React.useState([])

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

    function handleAddToFavorites() {
        addToFavorites(favorite_collector_id, item_id, selectedItem)
    }

    return(
        <section className="cardPage-section">
            <div className="cardPage-main-container">
                <div className="cardPage-container">
                    <div className="cardPage-img-container">
                        <img src={selectedItem[0].image} alt={selectedItem[0].title} />
                    </div>

                    <div className="cardPage-info-container">
                        <div>
                            <p>Name: <span className="cardPage-info">{selectedItem[0].title}</span></p>
                            <p>Price: <span className="cardPage-info">{selectedItem[0].price}</span></p>
                            <p>City: <span className="cardPage-info">{selectedItem[0].city}</span></p>
                        </div>

                        <div className="cardPage__info-about-user">
                            <Link to={`/users/${selectedItem[0].owner_id}`} className="cardPage-link">See all user ads &rarr;</Link>                       
                        </div>
                        {
                            isLoggin?
                                <div className="cardPage__btn-container">
                                    <button onClick={handleAddToFavorites} className='cardPage__favorite-btn'>Add to favorites</button>
                                    <button className='cardPage__write-message-btn'>Write a message</button>
                                </div>
                            :
                            <></>
                        }

                    </div>
                </div>
                {selectedItem[0].description.length <= 0 ? 
                <></> 
                :
                <p>
                    <span className="cardPage-info">Description:</span>
                    {selectedItem[0].description}
                </p>
                }
            </div>
        </section>
    );
}

export default CardPage;
