import React from 'react';
import CategorySearchEngine from '../CategorySearchEngine/CategorySearchEngine'
import { useParams } from 'react-router-dom'
import OneAd from '../../OneAd/OneAd.js'
import Category from '../Сategory/Сategory'

import './CategoryPage.css'

function CategoryPage({
    favorite, categories, 
    deleteMyAd, isLoggin,allImages,
    getItemById, addToFavorites, deleteFromFavorites, 
    favoriteItems, lastFourtyItems,  chooseCategory, 
    categoriesToRender, itemsSecondPageSearch, startToSearchSecondPage, getItemsByCategoryCategoryId, getItemsByParentId,
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
                        getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
                        getItemsByParentId={getItemsByParentId}
                    />
                  ))
                }
            </ul>
            <h2 className='main__title'>Ads</h2>
            <ul className='categoryPage-listings-container'>
                {itemsSecondPageSearch.map((item) => (
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
