import React from 'react';
import { useNavigate } from 'react-router-dom'
import OneAd from '../../OneAd/OneAd.js'
import Category from '../Сategory/Сategory'

import './CategoryPage.css'

function CategoryPage({
    favorite, 
    deleteMyAd, isLoggin,
    getItemById, addToFavorites, deleteFromFavorites, 
    favoriteItems, lastFourtyItems,  chooseCategory, 
    categoriesToRender, itemsSecondPageSearch,
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved, adsCategoryName
}) {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1);
    };
    
    return(
        <section className='categoryPage-main-container'>
            <p className='back-btn' onClick={goBack}>← Назад</p>
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
            {itemsSecondPageSearch.length?
                <>
                    <h2 className='categoryPage__ads-length-title'>Все объявления в категории {adsCategoryName}</h2>
                    <h2 className='categoryPage__ads-length-title'>Количество объявлений {itemsSecondPageSearch.length}</h2>
                </>
            :
                <h2 className='categoryPage__ads-length-title'>В категории {adsCategoryName}, не добавлено ни одного объявления :(</h2>
            }
            <ul className='categoryPage-listings-container'>
                {itemsSecondPageSearch.reverse().map((item) => (
                    <OneAd
                        
                        key={item.item_id} 
                        lastFourtyItems={lastFourtyItems} 
                        getItemById={getItemById} 
                        addToFavorites={addToFavorites}
                        deleteFromFavorites={deleteFromFavorites}
                        favorite={favorite}
                        favoriteItems={favoriteItems}
                        isLoggin={isLoggin}
                        item={item}
                        deleteMyAd={deleteMyAd}
                        openFirstMessagePopup={openFirstMessagePopup}
                        handleUpdateIsReserved={handleUpdateIsReserved}
                    />    
                    
                ))}
            </ul>
        </section>
    )
}

export default CategoryPage;
