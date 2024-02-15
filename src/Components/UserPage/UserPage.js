import {useParams} from 'react-router-dom'
import React from 'react'
import OneAd from '../OneAd/OneAd'
import './UserPage.css'

function UserPage({favoriteItems, getUserById, userInfo, myAds, getMyItems, getItemById, addToFavorites, isLoggin, deleteFromFavorites, favorite}) {
    
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

            {
            isLoggin?
                <div className='userPage__message-container'>
                  <p>Write a message to {userInfo[0].username}</p>
                  <div className='userPage__message-pic'></div> 
                </div>
            :
                <></>
            }

            <div>
                <h3>All ads</h3>
                <ul className="userPage-listings-container">
                    {myAds.map((item) => (
                        <OneAd 
                            favoriteItems={favoriteItems}
                            key={item.item_id} 
                            isLoggin={isLoggin} 
                            item={item} 
                            getItemById={getItemById} 
                            addToFavorites={addToFavorites}

                            deleteFromFavorites={deleteFromFavorites}
                            favorite={favorite}
                        />
                    ))}
                </ul>
            </div>
        </section>

    )
}

export default UserPage;