import Category from '../Сategory/Сategory'
import SubCategory from '../SubCategory/SubCategory'
import './MainCategories.css'

import { Link, useLocation } from 'react-router-dom'

function MainCategories({categories, onChooseCategory, categoryFromPage}) {
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
          (categoryFromPage.map((subCategory) => (
            <SubCategory key={subCategory.category_id} subCategory={subCategory}></SubCategory>
          )))
      }
     </ul>
  )
}

export default MainCategories;




/*

ALTER TABLE category
ADD COLUMN image_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D';


*/