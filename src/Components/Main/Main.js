import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'

function Main({categories, onChooseCategory, lastFourtyItems, getItemById}) {

    return(
        <section>
            <MainSearchEngine/>
            <MainCategories categories={categories} onChooseCategory={onChooseCategory}/>
            <h2 className='main__title'>All ad</h2>
            <ItemsContainer lastFourtyItems={lastFourtyItems} getItemById={getItemById}/>
        </section>
    )
}

export default Main;