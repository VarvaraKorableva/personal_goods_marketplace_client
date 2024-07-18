/*import '../Сategory/Сategory.css'
import { useParams, Link } from 'react-router-dom'

function SubCategory({subCategory, onChooseThirdCategory}) {

  let { slug } = useParams();

  function handleChoose() {
    onChooseThirdCategory(subCategory.category_id)
  }

    return(
      <li className="category-container" >
        <Link to={`/third-category-page/${subCategory.slug}`} onClick={handleChoose} className="category__link">
          <img src={subCategory.image_url} className="category-pic"></img>
          <p className="category-title">{subCategory.name}</p>
        </Link>

      </li>
    )
}

export default SubCategory;*/