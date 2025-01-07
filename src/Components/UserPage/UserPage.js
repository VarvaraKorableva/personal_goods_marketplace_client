import { useParams, useNavigate } from 'react-router-dom'
import React from 'react'
import OneAd from '../OneAd/OneAd'
import './UserPage.css'
import BackBtn from '../../UK-kit/BackBtn'

function UserPage({allImages, favoriteItems, getUserById, userInfo, myAds, getMyItems, getItemById, addToFavorites, isLoggin, deleteFromFavorites, favorite, openFirstMessagePopup}) {
    
    const owner_id = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        getUserById(Number(owner_id.owner_id));
        getMyItems(Number(owner_id.owner_id))
    }, []);

    if(userInfo.length === 0 || myAds.length === 0) {
        return <p>Loading ...</p>;
    }

    const goBack = () => {
        navigate(-1);
    };
    
    return(
        <section className='userPage_main-container'>
            <BackBtn/>
            <div className="userPage-user-info-container">
                <div className="userPage-user-info-pic"></div>
                <p className="userPage-user-info-name">{userInfo[0].username}</p>
            </div>
            

            <div>
                <h3>Все объявления {userInfo[0].username}</h3>
                <ul className="userPage-listings-container">
                    {myAds.reverse().map((item) => (
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