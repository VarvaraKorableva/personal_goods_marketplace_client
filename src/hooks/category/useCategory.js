import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../../Api/Api'

export default function useCategory({closeLoading, openLoading, }) {
    const [categories, setCategories] = React.useState([])
    const [categoriesToRender, setCategoriesToRender] = React.useState([])
    const [adsCategoryName, setAdsCategoryName] = React.useState('') 

    async function getCategory() {
      openLoading();
      /*const savedCategories = localStorage.getItem('category');
    
      if (savedCategories) {
        try {
          const categoriesSaved = JSON.parse(savedCategories);
          setCategories(categoriesSaved);
          setCategoriesToRender(categoriesSaved);
        } catch (e) {
          console.error("Ошибка парсинга category из localStorage:", e);
          localStorage.removeItem('category'); // очищаем битые данные
        }
        closeLoading();
      } else {*/
        try {
          const res = await Api.getCategory();
          //localStorage.setItem('category', JSON.stringify(res));
          setCategories(res);
          setCategoriesToRender(res);
          closeLoading();
        } catch (err) {
          console.log(err);
          closeLoading();
        }
      //}
    }
    
/*
    async function getCategory() {
        openLoading()
        const savedCategories = localStorage.getItem('category');

        let categoriesSaved;
        if (savedCategories) {
          categoriesSaved = JSON.parse(savedCategories);
          setCategories(categoriesSaved);
          setCategoriesToRender(categoriesSaved);
          closeLoading()
        } else {
        try {
          const res = await Api.getCategory();
          localStorage.setItem('category', JSON.stringify(res))
          setCategories(res);
          setCategoriesToRender(res);
          closeLoading()
        } catch (err) {
          console.log(err);
          closeLoading()
        }
      }

    }
*/
    const chooseCategory = (category) => {
        setCategoriesToRender(categories.filter((item) => item.parent_id === category.category_id)) 
        let myCatToRender = []
        findAllCategoryGrandChildren(category, myCatToRender) 
        setAdsCategoryName(category.name_rus)
    } 
  
    const findAllCategoryGrandChildren = (category, myCatToRenderNew) => {
      let childrens = categories.filter((item) => item.parent_id === category.category_id)
  
      if(childrens.length === 0) {
        myCatToRenderNew.push(category.category_id)
      } else {
        childrens.forEach((item) => {
          findAllCategoryGrandChildren(item, myCatToRenderNew)
        })
      }
      return myCatToRenderNew
    }

  return {
    getCategory,
    categories,
    categoriesToRender,
    chooseCategory,
    adsCategoryName,
  };

};