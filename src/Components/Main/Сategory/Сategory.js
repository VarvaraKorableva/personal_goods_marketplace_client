import './Сategory.css'
import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/HeaderLan'

function Category({category, onChooseCategory}) {
    let { slug } = useParams();
    const { language } = React.useContext(LanguageContext)

    function handleChoose() {
      onChooseCategory(category)//category.category_id
    }

    return (
        <li className="category-container" >
            <Link to={`/category/${category.slug}`} onClick={handleChoose} className="category__link">
              <img src={category.image_url} className="category-pic"></img>
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


/*
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_good BOOLEAN,
    parent_id INTEGER REFERENCES category(category_id)
);
*/