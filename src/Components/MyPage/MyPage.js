import React, { useEffect } from 'react'
import OneAd from '../OneAd/OneAd'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {Link} from 'react-router-dom'
import './MyPage.css'

function MyPage({allImages, isLoggin, getMyItems, myAds, deleteMyAd, handleLogout, getItemById, addToFavorites, deleteFromFavorites, favorite, favoriteItems}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    function onLogout() {
        handleLogout()
    }
    
    useEffect(()=> {
        getMyItems(userId)
    },[])

    return(
        <section>
            <div className="myPage__container">
                <div className="myPage__info-container">
                    <div className="myPage__avatar">avatar</div>
                    <div className="myPage__info-wrapper">
                        <p className="myPage__name">{currentUser.username}</p>
                        <p className="myPage__my-rating"></p>
                    </div>
                </div>
                <div className="myPage__listings-wrapper">
                    <h3 className="myPage__title">My listings</h3>
                    <ul className="myPage-listings-container">
                        {myAds.map((item) => (
                            <OneAd 
                                key={item.item_id} 
                                item={item} 
                                deleteMyAd={deleteMyAd} 
                                isLoggin={isLoggin}
                                getItemById={getItemById}

                                addToFavorites={addToFavorites} 
                                deleteFromFavorites={deleteFromFavorites}
                                favorite={favorite}
                                favoriteItems={favoriteItems}
                                allImages={allImages}
                            />
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>My reviews</h3>
                    <p>reviews</p>
                    <Link>See my reviews</Link>
                </div>
                <div>
                    <Link>Help</Link>
                </div>

                <div>
                    <Link>Edit profile information</Link>
                </div>

                <div>
                    <Link>Delete profile</Link>
                </div>

                <div>
                    <button onClick={onLogout}>Log out</button>
                </div>

            </div>
        </section>
    )
}

export default MyPage;
