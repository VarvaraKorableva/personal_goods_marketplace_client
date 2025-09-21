import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OneAd from '../../Components/OneAd/OneAd.js'
import Category from '../../Components/Main/Сategory/Сategory'
import './CategoryPage.css'
import BackBtn from '../../UK-kit/BackBtn'
import useCategory from "../../hooks/category/useCategory"
import useLoading from "../../hooks/useLoading"


function CategoryPage({
    openDeletePopup, isLoggin,
    getItemById, addToFavorites, deleteFromFavorites, 
    itemsSecondPageSearch,
    getItemsByCategoryCategoryId, getItemsByParentId, openFirstMessagePopup,
    handleUpdateIsReserved,
}) {
    const {
        openLoading,
        closeLoading,
        isLoading,
    } = useLoading();  
    
    const {
        getCategory,
        categories,
        categoriesToRender,
        chooseCategory,
        adsCategoryName,
      } = useCategory({closeLoading, openLoading, });


    const { "*": rest } = useParams(); // <-- вытаскиваем хвост
    const slugs = rest ? rest.split("/") : [];
  
    useEffect(() => {
        // если категории ещё не загружены, грузим их
        if (!categories.length) {
          getCategory();
          return;
        }
      
        if (slugs.length > 0) {
          const currentSlug = slugs[slugs.length - 1];
          const currentCategory = categories.find(cat => cat.slug === currentSlug);
      
          if (currentCategory) {
            chooseCategory(currentCategory);
      
            if (currentCategory.parent_id) {
              getItemsByCategoryCategoryId(currentCategory.category_id);
            } else {
              getItemsByParentId(currentCategory.category_id);
            }
          }
        }
      }, [rest, categories]);  

    
    return(
        <section className='categoryPage-main-container'>
            <BackBtn/>
            <ul className='categoryPage-categories-container'>
                {categoriesToRender.map((subCategory) => (
                    <Category 
                        key={subCategory.category_id} 
                        category={subCategory} 
                        categories={categories}
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
