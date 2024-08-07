import {useParams} from 'react-router-dom'
import React from 'react'
import OneAd from '../OneAd/OneAd'
import './UserPage.css'

function UserPage({allImages, favoriteItems, getUserById, userInfo, myAds, getMyItems, getItemById, addToFavorites, isLoggin, deleteFromFavorites, favorite, openFirstMessagePopup}) {
    
    const owner_id = useParams()

    React.useEffect(() => {
        getUserById(Number(owner_id.owner_id));
        getMyItems(Number(owner_id.owner_id))
    }, []);

    if(userInfo.length === 0 || myAds.length === 0) {
        return <p>Loading ...</p>;
    }
    
    return(
        <section className='userPage_main-container'>
            <div className="userPage-user-info-container">
                <div className="userPage-user-info-pic"></div>
                <p className="userPage-user-info-name">{userInfo[0].username}</p>
            </div>
            

            <div>
                <h3>Все объявления {userInfo[0].username}</h3>
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
                            allImages={allImages}
                            openFirstMessagePopup={openFirstMessagePopup}
                        />
                    ))}
                </ul>
            </div>
        </section>

    )
}

export default UserPage;