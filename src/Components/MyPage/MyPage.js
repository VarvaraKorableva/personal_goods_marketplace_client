import OneAd from '../OneAd/OneAd'

function MyPage() {

    const listings = []
    return(
        <section>
            <div className="myPage__container">
                <div className="myPage__info-container">
                    <p className="myPage__name"></p>
                    <p className="myPage__my-rating"></p>
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
