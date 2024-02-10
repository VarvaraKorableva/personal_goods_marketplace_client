//CategoryPage.js
import MainCategories from '../MainCategories/MainCategories'
import MainSearchEngine from '../MainSearchEngine/MainSearchEngine'
import ItemsContainer from '../ItemsContainer/ItemsContainer'
import { useParams } from 'react-router-dom'
import React from 'react';

function CategoryPage({categories}) {
    
    const [categoryFromPage, setCategoryFromPage] = React.useState([]); //if you came on route first
    let { slug } = useParams();

    React.useEffect(() => {
        const myCategory = categories.find((item) => item.slug === slug);
        if (categories.length > 0 && myCategory) {
            const filteredCategories = categories.filter((item) => item.parent_id === myCategory.category_id);
            setCategoryFromPage(filteredCategories);
        }
    }, [categories, slug]);

    if(categories.length === 0) {
        return <p>Loading ...</p>
    }

    return(
        <section>
            <MainSearchEngine/>
            <MainCategories categoryFromPage={categoryFromPage}/>
            <h2 className='main__title'> ads</h2>
        </section>
    )
}

export default CategoryPage;

/*function CategoryPage({categories, subCategories, goToCategory}) {

    const [categoryFromPage, setCategoryFromPage]= React.useState([]) //if you came on route first
    
    let { slug } = useParams();
 
    function seeSubCategory() {
        goToCategory(slug)
    }
    //http://localhost:3000/category/services
    //import { Link, useLocation } from 'react-router-dom'
    //location.pathname === `/category/${slug}`


    const myCategory = categories.find((item) => item.slug === slug);
    

    return(
        <section>
            <MainSearchEngine/>
            <MainCategories subCategories={subCategories} categoryFromPage={categoryFromPage}/>
            <h2 className='main__title'> ads</h2>
            
        </section>
    )
}

export default CategoryPage;*/

//<ItemsContainer />