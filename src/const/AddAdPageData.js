//AddAdPageData
const en = {
    adANewGood: 'Ad a New Good',
    adANewService: 'Ad a New Service',
    choiseACategory: 'Select a category',
    choiseAServices: 'Select a category',
    choiseASubCategory: 'Select a Subcategory',
    choiseASubCategoryOfServices: 'Select a Subcategory',
    choiseASecondSubCategoryGoods: 'Select a Subcategory',
    name: 'Add a Name of Good',
    condition: 'Select condition',
    serviceName: 'Add the name of the service you provide',
    description: 'Add a description here',
    serviceDescription: 'Add a description of the service here',
    price: 'Add a Price',
    servicePrice: 'Add a Price',

    place: 'Where can you give the goods (city)',
    
    cityServices: 'Where will the service be provided',
    picture: 'Add a Pictures',

    addBtn: 'Add the Ad',
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
    name: 'Добавьте название товара',
    condition: 'Выберите состояние товара',
    serviceName: 'Добавьте название услуги, которую вы предлагаете',
    description: 'Добавьте описание товара',
    serviceDescription: 'Добавьте описание услуги, которую вы предлагаете',
    price: 'Укажите стоимость товара (если указать стоимость 0, добавится бейдж - "Бесплатно")',
    servicePrice: 'Укажите стоимость услуги (если указать стоимость 0, добавится бейдж - "Бесплатно")',
    place: 'Где можно забрать товар (город)',
    
    cityServices: 'Укажите место, где будет оказана услуга',
    picture: 'Добавить фотографии',

    addBtn: 'Добавить объявление',
    //uploadPictureBtn: 'Загрузить фотографию',
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
            errorMessage: 'Добавьте название товара',
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
            errorMessage: 'Выберите состоятие товара',
        },
    }


}

const hebrew = {
    adANewGood: 'Добавить новый товар',
    adANewService: 'Ad a New Service',
    choiseACategory: 'Choise a category',
    choiseAServices: 'Choise a category',
    choiseASubCategory: 'Choise a Subcategory',
    choiseASubCategoryOfServices: 'Choise a Subcategory',
    name: 'Add a Name of Good',
    condition: 'Select condition',
    serviceName: 'Add the name of the service you provide',
    description: 'Add a description here',
    serviceDescription: 'Add a description of the service here',
    price: 'Add a Price',
    servicePrice: 'Add a Price',
    cityServices: 'Where will the service be provided',
    place: 'Where can you give the goods (city)',
    picture: 'Add a Picture',
    addBtn: 'Add the Ad',
    uploadPictureBtn: 'Upload picture',
}

const choose = { en, rus, hebrew };

export default choose;