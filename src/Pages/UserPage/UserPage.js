import { useParams } from 'react-router-dom'
import React from 'react'
import OneAd from '../../Components/OneAd/OneAd'
import './UserPage.css'
import BackBtn from '../../UK-kit/BackBtn'
import { useFavorites } from "../../contexts/FavoritesContext"
import Container from '../../UK-kit/Container/Container'

function UserPage({allImages, getUserById, userInfo, myAds, getMyItems, getItemById, addToFavorites, isLoggin, deleteFromFavorites, openFirstMessagePopup}) {

    const {
        favorite, 
        setFavorite, 
        favoriteItems,
        setFavoriteItems
    } = useFavorites();
    const owner_id = useParams()

    React.useEffect(() => {
        getUserById(Number(owner_id.owner_id));
        getMyItems(Number(owner_id.owner_id))
    }, []);

    if(userInfo.length === 0 || myAds.length === 0) {
        return <p>Loading ...</p>;
    }

    const moderatedAds = myAds.filter(ad => ad.moderated === true);
    
    return(
        <section className='userPage_main-container'>
            <BackBtn className='backBtn_margin-left'/>
            <div className="userPage-user-info-container">
                <div className="userPage-user-info-pic"></div>
                <p className="userPage-user-info-name">{userInfo[0].username}</p>
            </div>
            

            <div>
                <h3>Все объявления {userInfo[0].username}</h3>
                <Container as='ul' baseClassName='listings-container'>
                    {moderatedAds.map((item) => (
                        <OneAd 
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
                </Container>
            </div>
        </section>

    )
}

export default UserPage;