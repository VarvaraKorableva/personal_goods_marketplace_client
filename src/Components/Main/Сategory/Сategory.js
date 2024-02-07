import './Сategory.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Category({category, onChooseCategory}) {

    let { slug } = useParams();

    function handleChoose() {
        onChooseCategory(category.category_id)
        console.log(category.category_id)
    }

    return (
        <li className="category-container" >
            <Link to={`/category/${category.slug}`} onClick={handleChoose} className="category__link">
                <img src={category.image_url} className="category-pic"></img>
                <p className="category-title">{category.name}</p>
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