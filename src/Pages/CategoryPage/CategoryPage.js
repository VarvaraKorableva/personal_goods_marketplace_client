import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OneAd from '../../Components/OneAd/OneAd.js'
import Category from '../../Components/Main/Сategory/Сategory'
import './CategoryPage.css'
import BackBtn from '../../UK-kit/BackBtn'
import useCategory from "../../hooks/category/useCategory"
import useLoading from "../../hooks/useLoading"
import { useItemsContext } from '../../contexts/ItemsContext';

function CategoryPage({
    openDeletePopup, isLoggin,
    getItemById, addToFavorites, deleteFromFavorites, 
    handleCategoryScroll,
    openFirstMessagePopup,
    handleUpdateIsReserved, getItemsByCategoryId
}) {

    const {
        lastFourtyItems,
        setLastFourtyItems,
        itemsAfterSearch,
        setItemsAfterSearch,
        totalCountOfAds,
        setTotalCountOfAds,
        page,
        setPage,
        isPageItemsLoading,
        setIsPageItemsLoading,
        myImages,
        setMyImages,
        selectedItem,
        setSelectedItem,
        limit,
        city, setCity,
        lowPrice, setLowPrice,
        highPrice, setHighPrice,
        condition, setCondition,
        title, setTitle,
        categoryPage, setCategoryPage,
        currentFilters,
        categoryId, setCategoryId,
        itemsSecondPageSearch, setItemsSecondPageSearch,
        totalCategoryCountOfAds,
    } = useItemsContext();

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
            //getItemsByCategoryId(currentCategory.category_id)
            setCategoryId(currentCategory.category_id)
            const categoryId = currentCategory.category_id
            setCategoryPage(1);
            getItemsByCategoryId({
                page: 1,
                limit,
                filters: currentFilters,
                categoryId,
                recursive: true,
            });
          }
        }
      }, [rest, categories]);  

    
      React.useEffect(() => {
        window.addEventListener('scroll', handleCategoryScroll);
        return () => window.removeEventListener('scroll', handleCategoryScroll);
        
    }, [handleCategoryScroll]);

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
                        
                    />
                  ))
                }
            </ul>
            {itemsSecondPageSearch.length?
                <>
                    <h2 className='categoryPage__ads-length-title'>Все объявления в категории {adsCategoryName}</h2>
                    <h2 className='categoryPage__ads-length-title'>Количество объявлений {totalCategoryCountOfAds}</h2>
                </>
            :
                <h2 className='categoryPage__ads-length-title'>В категории {adsCategoryName}, не добавлено ни одного объявления :(</h2>
            }
            <ul className='categoryPage-listings-container'>
                {/*{[...itemsSecondPageSearch].reverse().map((item) => (*/}
                {itemsSecondPageSearch.map((item) => (
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
