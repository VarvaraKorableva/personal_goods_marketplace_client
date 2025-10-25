//AddAdPageData
const en = {
    adANewGood: 'Ad a New Good',
    adANewService: 'Ad a New Service',
    choiseACategory: 'Select a category',
    choiseAServices: 'Select a category',
    choiseASubCategory: 'Select a Subcategory',
    choiseASubCategoryOfServices: 'Select a Subcategory',
    choiseASecondSubCategoryGoods: 'Select a Subcategory',
    name: 'Add a title for the ad',
    condition: 'Select condition',
    propertyCondition: 'Select property condition',
    serviceName: 'Add the name of the service you provide',
    description: 'Add a description here',
    serviceDescription: 'Add a description of the service here',
    price: "Enter the item price in shekels (if you set the price to 0, a 'Free' badge will be added)",
    propertyRentPrice: 'Enter the monthly rent price for the property (if set to 0, a "Free" badge will be added)',
    propertyBuyPrice: 'Enter the property price (if set to 0, a "Free" badge will be added)',
    inputPlace: 'Start typing a city',
    servicePrice: 'Add a Price',

    place: 'Where can you give the goods (city)',
    
    cityServices: 'Where will the service be provided',
    picture: 'Add a Pictures',
    placeRealEstate: 'Where is the property located (city)',
    addBtn: 'Add the Ad',
    changeBtn: 'Edit',
    uploadPictureBtn: 'Upload picture',

    errors: {
        categoryErrorMessage: {
            errorMessage: 'Select a category',
        },
        secondCategoryErrorMessage: {
            errorMessage: 'Select a subcategory',
        },    
        thirdSubCategoryErrorMessage: {
            errorMessage: 'Select a subcategory',
        },
        titleErrorMessage: {
            errorMessage: 'Add a product title',
            errorMessageToLong: 'The length of the name cannot exceed 40 characters',
            errorMessageToSmall: 'The name cannot be less than 3 characters',
        },    
        priceErrorMessage: {
            errorMessage: 'Add a price',
            errorMessageOnlyNumbers: 'Price can only consist of digits',
            errorMessageToLong: 'The price cannot contain more than 10 digits',
        },
        cityErrorMessage: {
            errorMessage: 'Add a city',
            errorInCity: 'Are you sure such a city exists? If yes and you still get an error, add the nearest city to it',
        },
        conditionErrorMessage: {
            errorMessage: ' Select a condition',
        },
    },
    titles: {
        condition: 'Condition',
        city: 'City',
        price: 'Price',
        description: 'Description',
        telegram: 'Telegram',
    },
    editPopupBtn: {
        changeBtn: 'Change'
    }
  
}

const rus = {
    adANewGood: 'Добавить новый товар',
    adANewService: 'Добавить новую услугу',
    choiseACategory: 'Выберите категорию товара',
    choiseAServices: 'Выберите категорию',
    choiseASubCategory: 'Выберите cубкатегорию товара',
    choiseASubCategoryOfServices: 'Выберите cубкатегорию',
    choiseASecondSubCategoryGoods: 'Выберите cубкатегорию',
    name: 'Добавьте название объявления',
    condition: 'Выберите состояние товара',
    propertyCondition: 'Выберите состояние недвижимости',
    serviceName: 'Добавьте название услуги, которую вы предлагаете',
    description: 'Добавьте описание товара',
    serviceDescription: 'Добавьте описание услуги, которую вы предлагаете',
    propertyDescription: 'Добавьте описание недвижимости',
    price: 'Укажите стоимость товара в шекелях (если указать стоимость 0, добавится бейдж - "Бесплатно")',
    servicePrice: 'Укажите стоимость услуги (если указать стоимость 0, добавится бейдж - "Бесплатно")',
    propertyRentPrice: 'Укажите стоимость аренды недвижимости в месяц (если указать стоимость 0, добавится бейдж - "Бесплатно")',
    propertyBuyPrice: 'Укажите стоимость недвижимости (если указать стоимость 0, добавится бейдж - "Бесплатно")',
    place: 'Где можно забрать товар (город)',
    inputPlace: 'Начинайте вводить город',
    cityServices: 'Укажите место, где будет оказана услуга',
    picture: 'Добавить фотографии',
    placeRealEstate: 'Где находится объект недвижимости (город)',
    addBtn: 'Добавить объявление',
    changeBtn: 'Изменить',
    uploadPictureBtn: '+',

    errors: {
        categoryErrorMessage: {
            errorMessage: 'Выберите категорию',
        },
        secondCategoryErrorMessage: {
            errorMessage: 'Выберите субкатегорию',
        },    
        thirdSubCategoryErrorMessage: {
            errorMessage: 'Выберите субкатегорию',
        },
        titleErrorMessage: {
            errorMessage: 'Добавьте название объявления',
            errorMessageToLong: 'Длинна названия не может превышать 40 символов',
            errorMessageToSmall: 'Название не может быть меньше 3 символов',
        },    
        priceErrorMessage: {
            errorMessage: 'Добавьте цену',
            errorMessageOnlyNumbers: 'Цена может состоять только из цифр',
            errorMessageToLong: 'Цена не может содержать более 10 цифр',
        },
        cityErrorMessage: {
            errorMessage: 'Добавьте город',
            errorInCity: 'Вы уверены, что есть такой город? Если да и вы получили ошибку, добавьте ближайший к нему',
        },
        conditionErrorMessage: {
            errorMessage: 'Выберите состоятие',
        },
    },
    titles: {
        condition: 'состояние',
        city: 'город',
        price: 'цену',
        description: 'описание',
        telegram: 'Telegram',
    },
    editPopupBtn: {
        changeBtn: 'Изменить'
    }
}

const hebrew = {
    adANewGood: 'Добавить новый товар',
    adANewService: 'Ad a New Service',
    choiseACategory: 'Choise a category',
    choiseAServices: 'Choise a category',
    choiseASubCategory: 'Choise a Subcategory',
    choiseASubCategoryOfServices: 'Choise a Subcategory',
    name: 'Add a title for the ad',
    condition: 'Select condition',
    propertyCondition: 'Select property condition',
    serviceName: 'Add the name of the service you provide',
    description: 'Add a description here',
    serviceDescription: 'Add a description of the service here',
    price: "Enter the item price in shekels (if you set the price to 0, a 'Free' badge will be added)",
    propertyRentPrice: 'Enter the monthly rent price for the property (if set to 0, a "Free" badge will be added)',
    propertyBuyPrice: 'Enter the property price (if set to 0, a "Free" badge will be added)',
    servicePrice: 'Add a Price',
    cityServices: 'Where will the service be provided',
    place: 'Where can you give the goods (city)',
    inputPlace: 'Start typing a city',
    placeRealEstate: 'Where is the property located (city)',
    picture: 'Add a Picture',
    addBtn: 'Add the Ad',
    changeBtn: 'Edit',
    uploadPictureBtn: 'Upload picture',
}

const choose = { en, rus, hebrew };

export default choose;