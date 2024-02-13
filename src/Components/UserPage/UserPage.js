import {useParams} from 'react-router-dom'
import React from 'react'
import OneAd from '../OneAd/OneAd'
import './UserPage.css'

function UserPage({getUserById, userInfo, myAds, getMyItems, getItemById, addToFavorites}) {
    
    const owner_id = useParams()

    React.useEffect(() => {
        getUserById(Number(owner_id.owner_id));
        getMyItems(Number(owner_id.owner_id))
    }, []);//item_id

    if(userInfo.length === 0 || myAds.length === 0) {
        return <p>Loading ...</p>;
    }
    
    return(
        <section className='userPage_main-container'>
            <p>{userInfo[0].username}</p>
            <div className='userPage__message-container'>
                <p>Write a message to {userInfo[0].username}</p>
                <div className='userPage__message-pic'></div> 
            </div>

            <div>
                <h3>All ads</h3>
                <ul className="userPage-listings-container">
                    {myAds.map((item) => (
                        <OneAd key={item.item_id} item={item} getItemById={getItemById} addToFavorites={addToFavorites}/>
                    ))}
                </ul>
            </div>
        </section>

    )
}

export default UserPage;