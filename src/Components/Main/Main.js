import React from 'react'
import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'
import './Main.css'

function Main({
    categoriesToRender, isLoggin, 
    itemsAfterSearch, startToSearch, favorite, 
    categories, onChooseCategory, lastFourtyItems, 
    getItemById, addToFavorites, allImages,
    deleteFromFavorites, favoriteItems, deleteMyAd, getItemsByCategoryCategoryId, getItemsByParentId,}) {
    
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
            <MainCategories 
                onChooseCategory={onChooseCategory}
                categories={categories}
                categoriesToRender={categoriesToRender}

                getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
                getItemsByParentId={getItemsByParentId}
            />
            <h2 className='main__title'>All ad</h2>
            <ItemsContainer 
                allImages={allImages}
                itemsAfterSearch={itemsAfterSearch}
                lastFourtyItems={lastFourtyItems} 
                getItemById={getItemById} 
                addToFavorites={addToFavorites}
                deleteFromFavorites={deleteFromFavorites}
                favorite={favorite}
                favoriteItems={favoriteItems}
                isLoggin={isLoggin}
                deleteMyAd={ deleteMyAd}
            />
        </section>
    )
}

export default Main;