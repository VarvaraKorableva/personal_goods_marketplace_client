//import '../Сategory/Сategory.css'
import { useParams, Link } from 'react-router-dom'

function ThirdSubCategory({thirdSubCategory}) {

  let { slug } = useParams();

    return(
      <li className="category-container" >
        <div className="category__link">
          <img src={thirdSubCategory.image_url} className="category-pic"></img>
          <p className="category-title">{thirdSubCategory.name}</p>
        </div>

      </li>
    )
}

export default ThirdSubCategory;

////third-category-page