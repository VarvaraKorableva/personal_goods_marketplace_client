import './Сategory.css'


function Category({category}) {
    return (
        <li className="category-container">
            <img src={category.image_url} className="category-pic"></img>
            <p className="category-title">{category.name}</p>
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