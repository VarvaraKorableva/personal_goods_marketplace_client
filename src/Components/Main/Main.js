import MainCategories from './MainCategories/MainCategories'
import MainSearchEngine from './MainSearchEngine/MainSearchEngine'

function Main({categories, onChooseCategory, subCategories}) {

    return(
        <section>
            <MainSearchEngine/>
            <MainCategories subCategories={subCategories} categories={categories} onChooseCategory={onChooseCategory}/>
        </section>
    )
}

export default Main;