import './Сategory.css'
import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {LanguageContext} from '../../../contexts/TranslationContext'

function Category({category}) {
    let { slug } = useParams();
    const { language } = React.useContext(LanguageContext)
    const { "*": rest } = useParams(); 

    const path = rest ? rest.split("/") : [];
    
    // формируем новый путь: текущие + выбранная
    const newPath = path.length > 0
      ? `/category/${path.join("/")}/${category.slug}`
      : `/category/${category.slug}`;

    return (
        <li className="category-container" >
            <Link to={newPath}  className="category__link">
              <div className="category-pic-container">
                <img src={category.image_url} className="category-pic"></img>
              </div>
              {language === 'rus' ?
                <p className="category-title">{category.name_rus}</p>
              :
                <p className="category-title">{category.name}</p>
              }
            </Link>
        </li>
    )
}

export default Category;