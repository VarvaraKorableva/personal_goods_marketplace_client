import './Сategory.css'
import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/Timing'

function Category({category}) {
    let { slug } = useParams();
    const { language } = React.useContext(LanguageContext)
    const { "*": rest } = useParams(); 

    const { en, rus, hebrew } = choose;
  
    let translatedContext = '';
    if (language === 'en') {
      translatedContext = en;
    } else if (language === 'rus') {
      translatedContext = rus;
    } else if (language === 'hebrew') {
      translatedContext = hebrew;
    }

    const langKey = {
      rus: 'name_rus',
      en: 'name',
      hebrew: 'name_he'
    };

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
                <p className="category-title">{category[langKey[language]] || category.name}</p>
            </Link>
        </li>
    )
}

export default Category;