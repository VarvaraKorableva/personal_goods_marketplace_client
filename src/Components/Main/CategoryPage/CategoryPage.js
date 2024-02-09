//CategoryPage.js
import MainCategories from '../MainCategories/MainCategories'
import MainSearchEngine from '../MainSearchEngine/MainSearchEngine'
import ItemsContainer from '../ItemsContainer/ItemsContainer'

function CategoryPage({categories, onChooseCategory, subCategories, lastFourtyItems}) {

    return(
        <section>
            <MainSearchEngine/>
            <MainCategories subCategories={subCategories} categories={categories} onChooseCategory={onChooseCategory}/>
            <h2 className='main__title'> ads</h2>
            
        </section>
    )
}

export default CategoryPage;

//<ItemsContainer />