let arr = [
    {
        "category_id": 2,
        "name": "Clothes, shoes, accessories",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fENsb3RoZXMlMkMlMjBzaG9lcyUyQyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww"
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
        "image_url": "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFByb2R1Y3RzJTIwZm9yJTIwY2hpbGRyZW58ZW58MHx8MHx8fDA%3D"
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
        "image_url": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGRvZ3N8ZW58MHx8MHx8fDA%3D"
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
        "image_url": "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
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
        "image_url": "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFNlcnZpY2VzfGVufDB8fDB8fHww"
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
    },
    {
        "category_id": 56,
        "name": "Books",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGJvb2tzfGVufDB8fDB8fHww"
    },
    {
        "category_id": 57,
        "name": "Plants",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1521334884684-d80222895322?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        "category_id": 58,
        "name": "Art",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        "category_id": 59,
        "name": "Handmade",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1632649027900-389e810204e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFuZG1hZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        "category_id": 60,
        "name": "Homemade food",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1500816558239-6b91f4256ead?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWVtYWRlJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        "category_id": 61,
        "name": "Furniture",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnVybml0dXJlfGVufDB8fDB8fHww"
    },
    {
        "category_id": 62,
        "name": "Electronics",
        "is_good": true,
        "parent_id": null,
        "image_url": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGVsZWN0cm9uaWNzJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D"
    }
]