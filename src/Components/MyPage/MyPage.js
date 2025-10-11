import React from 'react'
import OneAd from '../OneAd/OneAd'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { LanguageContext } from '../../contexts/TranslationContext'
import choose from '../../const/myPageData'
import BackBtn from '../../UK-kit/BackBtn'
import './MyPage.css'
import Button from '../../UK-kit/Button/Button'
import { TbEdit } from "react-icons/tb";
import Container from '../../UK-kit/Container/Container'

function MyPage({ 
  openEditPopup, 
  onAdPopup, 
  isLoggin, 
  getMyItems, 
  myAds, 
  openDeletePopup, 
  getItemById, 
  addToFavorites, 
  deleteFromFavorites, 
  handleUpdateIsReserved 
}) {

  const currentUser = React.useContext(CurrentUserContext)
  const userId = currentUser.user_id
  const [isWhyImportantClicked, setIsWhyImportantClicked] = React.useState(false)
  const { language } = React.useContext(LanguageContext)

  const [limit, setLimit] = React.useState(5)

  const { en, rus, hebrew } = choose;
  let translatedContext = '';
  if (language === 'en') translatedContext = en;
  else if (language === 'rus') translatedContext = rus;
  else if (language === 'hebrew') translatedContext = hebrew;

  React.useEffect(() => {
    getMyItems(userId)
}, []);

  const addAds = () => setLimit(limit + 5); 

  function showTelergamInfo() {
    setIsWhyImportantClicked(!isWhyImportantClicked)
  }

  function handleAddMoreAds() {
    addAds()
  }

  function handleAddAdClick() {
    onAdPopup()
  }

  function openAddTelegramPopup() {
    openEditPopup(userId, "telegram")
  }

  // 🔑 Фильтры
  const filters = [
    { label: "Активные объявления", value: "active", condition: ad => ad.moderated === true },
    { label: "На проверке модератором", value: "pending", condition: ad => ad.moderated === false },
    //{ label: "Завершенные", value: "deleted", condition: ad => ad.deleted === true },
    //
    // сюда можно добавить ещё до 5
    // { label: "Завершенные", value: "closed", condition: ad => ad.closed === true },
  ];

  const [selectedFilter, setSelectedFilter] = React.useState(filters[0].value);

  const filteredAds = myAds.filter(ad => {
    const currentFilter = filters.find(f => f.value === selectedFilter);
    return currentFilter && currentFilter.condition ? currentFilter.condition(ad) : true;
  });

  return (
    <section>
      
      <BackBtn/>
      <div className="myPage__container">
        <div className="myPage__info-container">
          <div className="myPage__avatar-container">
            <div className="myPage__avatar">
              <p className="myPage__avatar-info-text">{translatedContext.temporaryMessage}</p>
            </div>
          </div>
          <div className="myPage__info-wrapper">
            <p className="myPage__name">{currentUser.username}</p>
            {currentUser.telegram ? (
              <button className="myPage__btn-container">
                <TbEdit className="cardPage-edit-icon" onClick={openAddTelegramPopup}/>
                <p className="myPage__name font">{currentUser.telegram}</p>
              </button>
            ) : (
              <>
                <button className="btn" onClick={openAddTelegramPopup}>
                  {translatedContext.btnNames.addTelegram}
                </button>
                <button onClick={showTelergamInfo} className="myPage__infoBtn">
                  {translatedContext.btnNames.whyDoesThisMatter}
                </button>
                {isWhyImportantClicked && (
                  <p className="myPage__name">{translatedContext.whyAddTelegramIsImportant}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* 🔑 Кнопки фильтров */}
        <Container as='div' baseClassName='container'  className='myPage__btn-wrapper'>
          {filters.map(filter => (
            <Button 
              key={filter.value} 
              onClick={() => setSelectedFilter(filter.value)}
              className={selectedFilter === filter.value ? "active-btn" : ""}
            >
              {filter.label}
            </Button>
          ))}
          <Button onClick={handleAddAdClick}>Добавить объявление</Button>
        </Container>

        <div className="myPage__listings-wrapper">

          {myAds.length === 0 ? (
            <div className="myPage__add-ad-container">
              <h3 className='myPage__noAdsMessage'>{translatedContext.noAdsMessage}</h3>
              <button className='btn' onClick={handleAddAdClick}>
                {translatedContext.addNewAdBtnName}
              </button>
            </div>
          ) : (
            <>

              <ul className="myPage-listings-container">
                {filteredAds.slice(0, limit).map((item) => (
                  <OneAd 
                    key={item.item_id} 
                    item={item} 
                    openDeletePopup={openDeletePopup} 
                    isLoggin={isLoggin}
                    getItemById={getItemById}
                    addToFavorites={addToFavorites} 
                    deleteFromFavorites={deleteFromFavorites}
                    handleUpdateIsReserved={handleUpdateIsReserved}
                  />
                ))}
              </ul>
            </>
          )}

          {filteredAds.length > limit && (
            <Button onClick={handleAddMoreAds} className="addMoreAdsBtn__style">
              {translatedContext.addMoreAdsBtn}
            </Button>
          )}
        </div>
      </div>
      
    </section>
  )
}

export default MyPage;
