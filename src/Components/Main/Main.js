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
    deleteFromFavorites, favoriteItems, deleteMyAd, 
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved, handleGetItemsByFilter, handleTitleChange, handleCityPriceAndConditionChange,
    resetAllfilters,}) {

    const [searchByKeyWord, setSearchByKeyWord] = React.useState('')    
    const [isFilterBtnClicked, setIsFilterBtnClicked] = React.useState(false) 
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    
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
/*
    const handleScroll = () => {
        const bottom = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
          === Math.max(document.documentElement.scrollTop + window.innerHeight, document.body.scrollTop + window.innerHeight);
      
        // Если мы достигли низа страницы и не в процессе загрузки
        if (bottom && !isLoading && lastFourtyItems.length < totalCountOfAds) {
          setIsLoading(true);  // Устанавливаем флаг загрузки
          setPage(prevPage => prevPage + 1);  // Увеличиваем номер страницы
        }
      };
    
    React.useEffect(() => {
        if (page > 1) {  // Запрашиваем новые данные только если страница больше 1
          getAllItems({ page, limit: 20 });  // Запрашиваем следующие 20 элементов
        }
    }, [page]);*/

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
            <h2 className='main__title'>Объявления по запросу "{searchByKeyWord}"</h2>
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
                deleteMyAd ={ deleteMyAd}
                openFirstMessagePopup = {openFirstMessagePopup}
                handleUpdateIsReserved={handleUpdateIsReserved}
            />

            {isLoading && <div className="loading-indicator">Загрузка...</div>}

        </section>
    )
}

export default Main;