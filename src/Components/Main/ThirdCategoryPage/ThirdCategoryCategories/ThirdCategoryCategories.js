//import Category from '../../Сategory/Сategory'
import ThirdSubCategory from '../ThirdSubCategory/ThirdSubCategory'
import './ThirdCategoryCategories.css'

function ThirdCategoryCategories({thirdSubCategories}) {

  return (
    <ul className="thirdCategoryCategories-container">
        {thirdSubCategories.map(item => (
            <ThirdSubCategory 
                key={item.category_id} 
                thirdSubCategory={item} 
            />
            ))
        }
     </ul>
  )
}

export default ThirdCategoryCategories;