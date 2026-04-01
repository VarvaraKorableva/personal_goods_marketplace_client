import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OneAd from '../../Components/OneAd/OneAd.js'
import Category from '../../Components/Main/Сategory/Сategory'
import './CategoryPage.css'
import BackBtn from '../../UK-kit/BackBtn'
import useCategory from "../../hooks/category/useCategory"
import useLoading from "../../hooks/useLoading"
import { useItemsContext } from '../../contexts/ItemsContext';
import { useFiltersContext } from "../../contexts/FiltersContext";
import { ITEMS_LIMIT } from "../../const/helper";
import Container from '../../UK-kit/Container/Container'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/CategoryData'

function CategoryPage({
    openDeletePopup, isLoggin,
    getItemById, addToFavorites, deleteFromFavorites, 
    handleCategoryScroll,
    openFirstMessagePopup,
    handleUpdateIsReserved, getItemsByCategoryId
}) {
    const limit = ITEMS_LIMIT
    const { language } = React.useContext(LanguageContext)

    const {
        setCategoryPage,
        setCategoryId,
        itemsSecondPageSearch,
        totalCategoryCountOfAds,
    } = useItemsContext();

    const {
        currentFilters,
      } = useFiltersContext();

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

    const { en, rus, hebrew } = choose;
    let translatedContext = '';
    if (language === 'en') {
      translatedContext = en;
    } else if (language === 'rus') {
      translatedContext = rus;
    } else if (language === 'hebrew') {
      translatedContext = hebrew;
    }
  
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
            <BackBtn className='backBtn_margin-left'/>
            <ul className='MainCategories-container'>
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
                    <h2 className='categoryPage__ads-length-title'>{translatedContext.allAdsInCategory} {adsCategoryName}</h2>
                    <h2 className='categoryPage__ads-length-title'>{translatedContext.totalAds} {totalCategoryCountOfAds}</h2>
                </>
            :
                <h2 className='categoryPage__ads-length-title'>{translatedContext.noAdsInCategoryPart1} {translatedContext.noAdsInCategoryPart2}</h2>
            }
            <Container as='ul' baseClassName='listings-container'>
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
            </Container>
        </section>
    )
}

export default CategoryPage;
