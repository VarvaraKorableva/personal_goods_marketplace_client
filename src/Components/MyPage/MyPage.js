import React from 'react'
import OneAd from '../OneAd/OneAd'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function MyPage() {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    const listings = []
    return(
        <section>
            <div className="myPage__container">
                <div className="myPage__info-container">
                    <p className="myPage__name">My name is: {currentUser.name}</p>
                    <p className="myPage__my-rating"></p>
                    <div>avatar</div>
                </div>
                <div className="myPage__listings-wrapper">
                    <h3 className="myPage__title">My listings</h3>
                    <ul className="myPage-listings-container">
                        {listings.map((item) => (
                            <OneAd item={item}/>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    )
}

export default MyPage;
