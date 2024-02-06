import Category from '../Сategory/Сategory'
import './MainCategories.css'

function MainCategories({}) {

    let arr = [
        {
            "category_id": 2,
            "name": "Clothes, shoes, accessories",
            "is_good": true,
            "parent_id": null,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 3,
            "name": "Women's clothing",
            "is_good": true,
            "parent_id": 2,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 4,
            "name": "Women's shoes",
            "is_good": true,
            "parent_id": 2,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 5,
            "name": "Men's clothing",
            "is_good": true,
            "parent_id": 2,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 6,
            "name": "Men's footwear",
            "is_good": true,
            "parent_id": 2,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 7,
            "name": "Bags, backpacks and suitcases",
            "is_good": true,
            "parent_id": 2,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 8,
            "name": "Accessories",
            "is_good": true,
            "parent_id": 2,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 9,
            "name": "Products for children",
            "is_good": true,
            "parent_id": null,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 10,
            "name": "Children's clothing and shoes",
            "is_good": true,
            "parent_id": 9,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 11,
            "name": "For boys",
            "is_good": true,
            "parent_id": 10,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 12,
            "name": "For girls",
            "is_good": true,
            "parent_id": 10,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 13,
            "name": "Products for children and toys",
            "is_good": true,
            "parent_id": 9,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 14,
            "name": "Strollers",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 15,
            "name": "Children's furniture",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 16,
            "name": "Bicycles and scooters",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 17,
            "name": "Feeding products",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 18,
            "name": "Car seats",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 19,
            "name": "Bed dress",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 20,
            "name": "Toys",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 21,
            "name": "Goods for school",
            "is_good": true,
            "parent_id": 13,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 22,
            "name": "Animals",
            "is_good": true,
            "parent_id": null,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 23,
            "name": "Goods for pets",
            "is_good": true,
            "parent_id": 22,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 24,
            "name": "Dogs",
            "is_good": true,
            "parent_id": 22,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 25,
            "name": "Cats",
            "is_good": true,
            "parent_id": 22,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 26,
            "name": "Birds",
            "is_good": true,
            "parent_id": 22,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 27,
            "name": "Transport and spare parts",
            "is_good": true,
            "parent_id": null,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 28,
            "name": "Motorcycles and motor vehicles",
            "is_good": true,
            "parent_id": 27,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 29,
            "name": "Auto",
            "is_good": true,
            "parent_id": 27,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 30,
            "name": "Spare parts and accessories",
            "is_good": true,
            "parent_id": 27,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 31,
            "name": "Services",
            "is_good": false,
            "parent_id": null,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 32,
            "name": "Beauty and Health",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 33,
            "name": "Manicure and pedicure",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 34,
            "name": "Hairdresser services",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 35,
            "name": "Eyebrows and eyelashes",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 36,
            "name": "Cosmetology",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 37,
            "name": "Epilation",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 38,
            "name": "Makeup",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 39,
            "name": "Tattoo, piercing",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 40,
            "name": "Psychology",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 41,
            "name": "Dietetics services",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 42,
            "name": "Fitness, yoga",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 43,
            "name": "Other",
            "is_good": false,
            "parent_id": 32,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 44,
            "name": "Training, courses, tutors",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 45,
            "name": "Design, drawing",
            "is_good": false,
            "parent_id": 44,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 46,
            "name": "Foreign languages",
            "is_good": false,
            "parent_id": 44,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 47,
            "name": "IT courses",
            "is_good": false,
            "parent_id": 44,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 49,
            "name": "Freight transportation",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 50,
            "name": "Repair and finishing",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 51,
            "name": "Equipment repair",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 52,
            "name": "Construction",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 53,
            "name": "Equipment installation",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 54,
            "name": "Air conditioner cleaning",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "category_id": 55,
            "name": "Cleaning",
            "is_good": false,
            "parent_id": 31,
            "image_url": "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
        }
    ]

    return (
        <ul className="MainCategories-container">
            {arr.filter(item => item.parent_id === null).map(item => (
                <Category key={item.category_id} category={item}/>
            ))}
        </ul>
    )
}

export default MainCategories;




/*

ALTER TABLE category
ADD COLUMN image_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D';


*/