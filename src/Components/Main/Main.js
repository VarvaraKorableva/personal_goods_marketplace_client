import React from 'react'
import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'
import FilterBtnContainer from './FilterBtnContainer/FilterBtnContainer'
import './Main.css'
//import useScroll from "../../hooks/useScroll"
import { useItemsContext } from "../../contexts/ItemsContext";

function Main({
    categoriesToRender, isLoggin, 
    getAllItems,
    categories, onChooseCategory,
    getItemById, addToFavorites,
    deleteFromFavorites, openDeletePopup, 
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved, handleGetItemsByFilter, handleTitleChange, handleCityPriceAndConditionChange,
    resetAllfilters, handleScroll,
    getCategory, userId, getMyFavorites,
}) {

    const {
        lastFourtyItems,
        setLastFourtyItems,
        itemsAfterSearch,
        setItemsAfterSearch,
        totalCountOfAds,
        setTotalCountOfAds,
        page,
        setPage,
        isPageItemsLoading,
        setIsPageItemsLoading,
      } = useItemsContext();

    const [searchByKeyWord, setSearchByKeyWord] = React.useState('')    
    const [isFilterBtnClicked, setIsFilterBtnClicked] = React.useState(false) 

    function getTitle(keyWord) {
        setSearchByKeyWord(keyWord)
    }  

    function handleFilterBtnClick() {
        setIsFilterBtnClicked(!isFilterBtnClicked)
    }

    function resetTitle(){
        setSearchByKeyWord('')
    }

      React.useEffect(()=>{
        getCategory()
        if(userId) {
          getMyFavorites(userId, lastFourtyItems)
        }
        if (lastFourtyItems.length === 0) {
            getAllItems(1);
          }
      },[])
    
      React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        
      }, [handleScroll]);

    return(
        <section className='main__section'> {/*Только на главной странице категории, поисковик и объявления*/}
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
                getItemById = {getItemById} 
                addToFavorites = {addToFavorites}
                deleteFromFavorites = {deleteFromFavorites}
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