import {useParams} from 'react-router-dom'
import React from 'react'
import OneAd from '../OneAd/OneAd'
import './UserPage.css'

function UserPage({getUserById, userInfo, myAds, getMyItems, getItemById}) {

    const owner_id = useParams()

    React.useEffect(() => {
        getUserById(Number(owner_id.owner_id));
        getMyItems(Number(owner_id.owner_id))
    }, []);//item_id

    if(userInfo.length === 0 || myAds.length === 0) {
        return <p>Loading ...</p>;
    }

    console.log(myAds)
    
    return(
        <>
            <h3>UserPage</h3>
            <p>{userInfo[0].username}</p>
            <p>Reiting</p>
            <p>Write a message to {userInfo[0].username}</p>
            <div>
                <h3>All ads</h3>
                <ul className="userPage-listings-container">
                    {myAds.map((item) => (
                        <OneAd key={item.item_id} item={item} getItemById={getItemById}/>
                    ))}
                </ul>
            </div>
        </>

    )
}

export default UserPage;