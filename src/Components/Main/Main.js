import React from 'react'
import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'
import FilterBtnContainer from './FilterBtnContainer/FilterBtnContainer'
import './Main.css'

function Main({
    categoriesToRender, isLoggin, 
    itemsAfterSearch, startToSearch, favorite, 
    categories, onChooseCategory, lastFourtyItems, 
    getItemById, addToFavorites, allImages,
    deleteFromFavorites, favoriteItems, deleteMyAd, 
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved, }) {
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    return(
        <section className='main__section'>
            <MainSearchEngine
                lastFourtyItems={lastFourtyItems}
                categories={categories}
                startToSearch={startToSearch}
            />
            <FilterBtnContainer></FilterBtnContainer>
            <MainCategories 
                onChooseCategory={onChooseCategory}
                categories={categories}
                categoriesToRender={categoriesToRender}
                getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
                getItemsByParentId={getItemsByParentId}
            />
            
            <h2 className='main__title'>Все объявления</h2>
            <ItemsContainer 
                allImages = {allImages}
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