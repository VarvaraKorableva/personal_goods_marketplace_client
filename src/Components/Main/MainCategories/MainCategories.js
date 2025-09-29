import Category from '../Сategory/Сategory'
import './MainCategories.css'
import { useLocation } from 'react-router-dom'

function MainCategories({ categories, onChooseCategory}) {
  const location = useLocation();

  return (
    <ul className="MainCategories-container">
      {categories.filter(item => item.parent_id === null).map(item => (
        <Category key={item.category_id} category={item} onChooseCategory={onChooseCategory}/>
        ))
      }
    </ul>
  )
}

export default MainCategories;