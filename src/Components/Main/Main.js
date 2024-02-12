import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'

function Main({itemsAfterSearch, startToSearch, favorite, categories, onChooseCategory, lastFourtyItems, getItemById, addToFavorites, deleteFromFavorites, favoriteItems}) {

    return(
        <section>
            <MainSearchEngine
                lastFourtyItems={lastFourtyItems}
                categories={categories}
                startToSearch={startToSearch}
            />
            <MainCategories categories={categories} onChooseCategory={onChooseCategory}/>
            <h2 className='main__title'>All ad</h2>
            <ItemsContainer 
                itemsAfterSearch={itemsAfterSearch}
                lastFourtyItems={lastFourtyItems} 
                getItemById={getItemById} 
                addToFavorites={addToFavorites}
                deleteFromFavorites={deleteFromFavorites}
                favorite={favorite}
                favoriteItems={favoriteItems}
            />
        </section>
    )
}

export default Main;