import React from 'react';
import OneAd from '../../OneAd/OneAd.js'
import Category from '../Сategory/Сategory'
import './CategoryPage.css'
import BackBtn from '../../../UK-kit/BackBtn'

function CategoryPage({
    openDeletePopup, isLoggin,
    getItemById, addToFavorites, deleteFromFavorites, 
    chooseCategory, 
    categoriesToRender, itemsSecondPageSearch,
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved, adsCategoryName,
}) {
    
    return(
        <section className='categoryPage-main-container'>
            <BackBtn/>
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
                {[...itemsSecondPageSearch].reverse().map((item) => (
                    <OneAd
                        key={item.item_id} 
                        getItemById={getItemById} 
                        addToFavorites={addToFavorites}
                        deleteFromFavorites={deleteFromFavorites}
                        isLoggin={isLoggin}
                        item={item}
                        openDeletePopup={openDeletePopup}
                        openFirstMessagePopup={openFirstMessagePopup}
                        handleUpdateIsReserved={handleUpdateIsReserved}
                    />    
                    
                ))}
            </ul>
        </section>
    )
}

export default CategoryPage;
