import React from 'react'
import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'
import FilterBtnContainer from './FilterBtnContainer/FilterBtnContainer'
import './Main.css'

function Main({
    categoriesToRender, isLoggin, 
    itemsAfterSearch, favorite, 
    categories, onChooseCategory, lastFourtyItems, totalCountOfAds,
    getItemById, addToFavorites,
    deleteFromFavorites, favoriteItems, deleteMyAd, 
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved, handleGetItemsByFilter, handleTitleChange, handleCityPriceAndConditionChange}) {
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    return(
        <section className='main__section'>
            <MainSearchEngine
                handleTitleChange={handleTitleChange}
                handleGetItemsByFilter={handleGetItemsByFilter}
            />
            <FilterBtnContainer 
                handleGetItemsByFilter={handleGetItemsByFilter}
                handleCityPriceAndConditionChange={handleCityPriceAndConditionChange}
            />
            <MainCategories 
                onChooseCategory={onChooseCategory}
                categories={categories}
                categoriesToRender={categoriesToRender}
                getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
                getItemsByParentId={getItemsByParentId}
            />
            
            <h2 className='main__title'>Все объявления, количество объявлений на сайте {totalCountOfAds}</h2>
            <ItemsContainer 
                
                itemsAfterSearch = {itemsAfterSearch}
                lastFourtyItems = {lastFourtyItems} 
                getItemById = {getItemById} 
                addToFavorites = {addToFavorites}
                deleteFromFavorites = {deleteFromFavorites}
                favorite = {favorite}
                favoriteItems = {favoriteItems}
                isLoggin = {isLoggin}
                deleteMyAd ={ deleteMyAd}
                openFirstMessagePopup = {openFirstMessagePopup}
                handleUpdateIsReserved={handleUpdateIsReserved}
            />
        </section>
    )
}

export default Main;