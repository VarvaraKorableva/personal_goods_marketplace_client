import '../Сategory/Сategory.css'

function SubCategory({subCategory}) {
    return(
      <li className="category-container" >
        <img src={subCategory.image_url} className="category-pic"></img>
        <p className="category-title">{subCategory.name}</p>
      </li>
    )
}

export default SubCategory;