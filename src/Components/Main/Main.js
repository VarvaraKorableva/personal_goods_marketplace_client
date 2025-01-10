import React from 'react'
import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'
import FilterBtnContainer from './FilterBtnContainer/FilterBtnContainer'
import './Main.css'

function Main({
    categoriesToRender, isLoggin, 
    itemsAfterSearch, favorite, getAllItems,
    categories, onChooseCategory, lastFourtyItems, totalCountOfAds,
    getItemById, addToFavorites,
    deleteFromFavorites, favoriteItems, openDeletePopup, 
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved, handleGetItemsByFilter, handleTitleChange, handleCityPriceAndConditionChange,
    resetAllfilters, page, isPageItemsLoading}) {

    const [searchByKeyWord, setSearchByKeyWord] = React.useState('')    
    const [isFilterBtnClicked, setIsFilterBtnClicked] = React.useState(false) 
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    function getTitle(keyWord) {
        setSearchByKeyWord(keyWord)
    }  

    function handleFilterBtnClick() {
        setIsFilterBtnClicked(!isFilterBtnClicked)
    }

    function resetTitle(){
        setSearchByKeyWord('')
    }

    React.useEffect(() => {
        if (page > 1) {
          getAllItems({ page, limit: 20 });
          console.log('main') 
        }
    }, [page]);

    return(
        <section className='main__section'>
            <MainSearchEngine
                handleTitleChange={handleTitleChange}
                handleGetItemsByFilter={handleGetItemsByFilter}
                getTitle={getTitle}
                handleFilterBtnClick={handleFilterBtnClick}
                getAllItems={getAllItems}
                resetTitle={resetTitle}
            />
            {
                isFilterBtnClicked?
            
                <FilterBtnContainer 
                    handleGetItemsByFilter={handleGetItemsByFilter}
                    handleCityPriceAndConditionChange={handleCityPriceAndConditionChange}
                    resetAllfilters={resetAllfilters}
                    getAllItems={getAllItems}
                    resetTitle={resetTitle}
                />
                :
                <></>
            }
            <MainCategories 
                onChooseCategory={onChooseCategory}
                categories={categories}
                categoriesToRender={categoriesToRender}
                getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
                getItemsByParentId={getItemsByParentId}
            />
            {itemsAfterSearch.length?

            (searchByKeyWord.length?
            <h2 className='main__title'>Объявления по запросу «{searchByKeyWord}»</h2>
            :
            <h2 className='main__title'>Количество объявлений на сайте {totalCountOfAds}</h2>
            )

            :
            <h2 className='main__title'>Объявлений не найдено</h2>

            }

            <ItemsContainer 
                itemsAfterSearch = {itemsAfterSearch}
                lastFourtyItems = {lastFourtyItems} 
                getItemById = {getItemById} 
                addToFavorites = {addToFavorites}
                deleteFromFavorites = {deleteFromFavorites}
                favorite = {favorite}
                favoriteItems = {favoriteItems}
                isLoggin = {isLoggin}
                openDeletePopup ={openDeletePopup}
                openFirstMessagePopup = {openFirstMessagePopup}
                handleUpdateIsReserved={handleUpdateIsReserved}
            />

            {/*isPageItemsLoading && <div className="loading-indicator">Загрузка...</div>*/}

        </section>
    )
}

export default Main;