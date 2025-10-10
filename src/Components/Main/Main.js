import React from 'react'
import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'
import FilterBtnContainer from './FilterBtnContainer/FilterBtnContainer'
import './Main.css'
import { useItemsContext } from "../../contexts/ItemsContext";
import { useFiltersContext } from "../..//contexts/FiltersContext";
import { ITEMS_LIMIT } from "../../const/helper";

function Main({
    categoriesToRender, isLoggin, 
    getAllItems,
    categories, onChooseCategory,
    getItemById, addToFavorites,
    deleteFromFavorites, openDeletePopup, 
    openFirstMessagePopup,
    handleUpdateIsReserved, handleGetItemsByFilter,
    resetAllfilters, handleScroll,
    getCategory, userId, getMyFavorites,
}) {
    const limit = ITEMS_LIMIT

    const {
        lastFourtyItems,
        itemsAfterSearch,
        totalCountOfAds,
    } = useItemsContext();

    const {
        currentFilters,
      } = useFiltersContext();

    const [searchByKeyWord, setSearchByKeyWord] = React.useState('')    
    const [isFilterBtnClicked, setIsFilterBtnClicked] = React.useState(false) 

    function handleFilterBtnClick() {
        setIsFilterBtnClicked(!isFilterBtnClicked)
    }

    React.useEffect(()=>{
        getCategory()
        if(userId) {
          getMyFavorites(userId, lastFourtyItems)
        }
        if (lastFourtyItems.length === 0) {
            getAllItems({ page: 1, limit, filters: currentFilters }) 
          }
    },[])
    
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        
    }, [handleScroll]);


    return(
        <section className='main__section'> {/*Только на главной странице категории, поисковик и объявления*/}
            <MainSearchEngine
                handleGetItemsByFilter={handleGetItemsByFilter}
                handleFilterBtnClick={handleFilterBtnClick}
                getAllItems={getAllItems}
                resetAllfilters={resetAllfilters}
            />
            {
                isFilterBtnClicked?
            
                <FilterBtnContainer  
                    resetAllfilters={resetAllfilters}
                    getAllItems={getAllItems}
                />
                :
                <></>
            }
            <MainCategories 
                onChooseCategory={onChooseCategory}
                categories={categories}
                categoriesToRender={categoriesToRender}
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