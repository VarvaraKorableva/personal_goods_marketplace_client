import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

function CardPage({ selectedItem, getItemById, getUserById, userInfo }) {
    let { item_id } = useParams();
    
    useEffect(() => {
        getItemById(item_id);
        //getUserById(selectedItem[0].owner_id)
    }, []);//item_id

    if(selectedItem.length === 0) {
        return <p>Loading ...</p>;
    }

    return(
        <section>
            <div>
                <img alt={selectedItem[0].title}></img>
            </div>
            <div>
                <p>{selectedItem[0].title}</p>
                <p>{selectedItem[0].price}</p>
                <p>{selectedItem[0].description}</p>
                <p>{selectedItem[0].city}</p>
            </div>
            <button>Add to favorites</button>
            <button>Write a message</button>

            <div className="cardPage__info-about-user">
                <p>Seller</p>
                <p>Reviews</p>
                <Link to={`/users/${selectedItem[0].owner_id}`}>See all user ads</Link>
            </div>
        </section>
    );
}

export default CardPage;
///users/${userId}