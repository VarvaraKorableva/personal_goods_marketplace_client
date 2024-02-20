import React from 'react';
import MainCategories from '../MainCategories/MainCategories'
import CategorySearchEngine from '../CategorySearchEngine/CategorySearchEngine'
import ItemsContainer from '../ItemsContainer/ItemsContainer'
import { useParams } from 'react-router-dom'
import OneAd from '../../OneAd/OneAd.js'
import Category from '../Сategory/Сategory'

import './CategoryPage.css'

function CategoryPage({
    favorite, categories, 
    deleteMyAd, isLoggin,allImages,
    getItemById, addToFavorites, deleteFromFavorites, 
    favoriteItems, lastFourtyItems,  chooseCategory, 
    categoriesToRender,
    categorySecondPageSearch, startToSearchSecondPage
}) {
    
    const [categoryFromPage, setCategoryFromPage] = React.useState(categoriesToRender);
    let { slug } = useParams();

    React.useEffect(() => {
        const myCategory = categoriesToRender.find((item) => item.slug === slug);
        if (categoriesToRender.length > 0 && myCategory) {
            const filteredCategories = categories.filter((item) => item.parent_id === myCategory.category_id);
            setCategoryFromPage(filteredCategories);
        }
    }, [categoriesToRender, slug]);

    if(categoryFromPage.length <= 0) {
       return <p>Loading ...</p>
    }

    return(
        <section className='categoryPage-main-container'>
            <CategorySearchEngine startToSearchSecondPage={startToSearchSecondPage}/>

            <ul className='categoryPage-categories-container'>
                {categoriesToRender.map((subCategory) => (
                    <Category 
                        key={subCategory.category_id} 
                        category={subCategory} 
                        onChooseCategory={chooseCategory}
                    />
                  ))
                }
            </ul>
            <h2 className='main__title'> ads</h2>
            <ul className='categoryPage-listings-container'>
                {categorySecondPageSearch.map((item) => (
                    <OneAd 
                        allImages={allImages}
                        key={item.item_id} 
                        lastFourtyItems={lastFourtyItems} 
                        getItemById={getItemById} 
                        addToFavorites={addToFavorites}
                        deleteFromFavorites={deleteFromFavorites}
                        favorite={favorite}
                        favoriteItems={favoriteItems}
                        isLoggin={isLoggin}
                        item={item}>
                        deleteMyAd={deleteMyAd}
                        
                    </OneAd>
                ))}
            </ul>
        </section>
    )
}

export default CategoryPage;
