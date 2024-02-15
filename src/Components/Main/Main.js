import React from 'react'
import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'

function Main({
    categoriesToRender, isLoggin, 
    itemsAfterSearch, startToSearch, favorite, 
    categories, onChooseCategory, lastFourtyItems, 
    getItemById, addToFavorites, 
    deleteFromFavorites, favoriteItems}) {
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    return(
        <section>
            <MainSearchEngine
                lastFourtyItems={lastFourtyItems}
                categories={categories}
                startToSearch={startToSearch}
            />
            <MainCategories 
                onChooseCategory={onChooseCategory}
                categories={categories}
                categoriesToRender={categoriesToRender}
            />
            <h2 className='main__title'>All ad</h2>
            <ItemsContainer 
                itemsAfterSearch={itemsAfterSearch}
                lastFourtyItems={lastFourtyItems} 
                getItemById={getItemById} 
                addToFavorites={addToFavorites}
                deleteFromFavorites={deleteFromFavorites}
                favorite={favorite}
                favoriteItems={favoriteItems}
                isLoggin={isLoggin}
            />
        </section>
    )
}

export default Main;