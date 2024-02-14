import Category from '../Сategory/Сategory'
//import SubCategory from '../SubCategory/SubCategory'
import './MainCategories.css'

import { useLocation } from 'react-router-dom'

function MainCategories({ categories, onChooseCategory, categoriesToRender}) {
  const location = useLocation();

  return (
    <ul className="MainCategories-container">
      {
        location.pathname === '/'? 
          (categories.filter(item => item.parent_id === null).map(item => (
            <Category key={item.category_id} category={item} onChooseCategory={onChooseCategory}/>
            ))
          )
        :
          (categoriesToRender.map((subCategory) => (
            <Category key={subCategory.category_id} category={subCategory} onChooseCategory={onChooseCategory}></Category> 
          )))
      }
     </ul>
  )
}

export default MainCategories;