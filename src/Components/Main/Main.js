import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'
import ItemsContainer from './ItemsContainer/ItemsContainer'

function Main({categories, onChooseCategory, subCategories, lastFourtyItems}) {

    return(
        <section>
            <MainSearchEngine/>
            <MainCategories subCategories={subCategories} categories={categories} onChooseCategory={onChooseCategory}/>
            <h2 className='main__title'>All ad</h2>
            <ItemsContainer lastFourtyItems={lastFourtyItems}/>
        </section>
    )
}

export default Main;