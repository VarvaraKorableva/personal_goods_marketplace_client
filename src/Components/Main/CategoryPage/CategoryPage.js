import React from 'react';
import MainCategories from '../MainCategories/MainCategories'
import MainSearchEngine from '../MainSearchEngine/MainSearchEngine'
import ItemsContainer from '../ItemsContainer/ItemsContainer'
import { useParams } from 'react-router-dom'
import OneAd from '../../OneAd/OneAd.js'
import Category from '../Сategory/Сategory'

import './CategoryPage.css'

function CategoryPage({
    favorite, categories, 
    onChooseCategory, isLoggin,
    getItemById, addToFavorites, deleteFromFavorites, 
    favoriteItems, lastFourtyItems,  chooseCategory, 
    startToSearch, categoryItemsSearch, categoriesToRender
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

    console.log(categoryFromPage)

    if(categoryFromPage.length <= 0) {
       return <p>Loading ...</p>
    }

    console.log('categoryItemsSearch =>', categoryItemsSearch)
    return(
        <section className='categoryPage-main-container'>
            <MainSearchEngine startToSearch={startToSearch}/>

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
                {categoryItemsSearch.map((item) => (
                    <OneAd 
                        key={item.item_id} 
                        //itemsAfterSearch={itemsAfterSearch}
                        lastFourtyItems={lastFourtyItems} 
                        getItemById={getItemById} 
                        addToFavorites={addToFavorites}
                        deleteFromFavorites={deleteFromFavorites}
                        favorite={favorite}
                        favoriteItems={favoriteItems}
                        isLoggin={isLoggin}
                        item={item}>
                    </OneAd>
                ))}
            </ul>
        </section>
    )
}
//не писала функцию для фильтрации - нет стейта
//лайки

export default CategoryPage;
