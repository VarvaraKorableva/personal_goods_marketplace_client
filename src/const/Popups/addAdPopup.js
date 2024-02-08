const en = {
    popupName: 'Add a new ad',
    nameOfDream: 'Name of ad',
    linkToDream: 'Link to ad',
    priceOfDream: 'Price of ad (in dollars)',
    pictureOfDream: 'Picture of ad',
    createButton: 'Create',

    errorNameMessage: {
        nameFieldMustBeFilledIn: 'The name field must be filled in.',
        nameMustBeAtLeastCharactersLong:'The name must be at least 2 characters long.',
        nameShouldOnlyContainLatinLettersCyrillicLettersSpacesOrHyphens: 'The name should only contain Latin letters, Cyrillic letters, spaces, or hyphens.',
        nameShouldNotExceedCharacters:'The name should not exceed 30 characters.',

    },
    errorDreamLinkMessage:{
        invalidLink:'Invalid link'
    },
    img:{
        buttonTextUploaded: 'Uploaded',
        buttonTextUploadPictureOfYourDream: 'Upload picture',
    
        errorImgMessage: 'Please upload only image files (jpg, jpeg, png).',
    },
    errorPriceMessage: {
        OnlyNumericInputIsAllowed: 'Only numeric input is allowed.',
        PriceCannotStartWith: 'Price cannot start with 0.',
        FieldMustBeFilledIn: 'The field must be filled in.',
        FieldCannotExceedCharacters: 'Field cannot exceed 15 characters.',
        PriceCannotBeNegative: "Price can't be negative",
    },
}

const rus = {
    popupName: 'Добавить новую мечту',
    nameOfDream: 'Название мечты',
    linkToDream: 'Ссылка, где купить мечту',
    priceOfDream: 'Цена мечты (в долларах)',
    pictureOfDream: 'Картинка мечты',
    createButton: 'Создать',

    errorNameMessage: {
        nameFieldMustBeFilledIn: 'Поле должно быть заполнено',
        nameMustBeAtLeastCharactersLong:'Поле должно содержать не менее 2 символов.',
        nameShouldOnlyContainLatinLettersCyrillicLettersSpacesOrHyphens: 'Название должно содержать только латинские буквы, кириллические буквы, пробелы или дефисы.',
        nameShouldNotExceedCharacters:'Поле не должно превышать 30 символов',
    },
    errorDreamLinkMessage:{
        invalidLink:'Некорректная ссылка.'
    },
    img:{
        buttonTextUploaded: 'Загружено',
        buttonTextUploadPictureOfYourDream: 'Загрузить картинку',
        
        errorImgMessage: 'Пожалуйста, загружайте только файлы изображений (jpg, jpeg, png).',
    },
    errorPriceMessage: {
        OnlyNumericInputIsAllowed: 'Разрешен только числовой ввод.',
        PriceCannotStartWith: 'Цена не может начинаться с 0.',
        FieldMustBeFilledIn: 'Поле должно быть заполнено',
        FieldCannotExceedCharacters: 'Поле не может превышать 15 символов',
        PriceCannotBeNegative: "Цена не может быть отрицательной",
    },
}

const hebrew = {
    popupName: 'הוסף חלום חדש',
    nameOfDream: 'שם החלום',
    linkToDream: 'קישור לרכישת חלום',
    priceOfDream: 'מחיר החלום (בדולרים)',
    pictureOfDream: 'תמונה של החלום',
    createButton: 'צור',

    errorNameMessage: {
        nameFieldMustBeFilledIn: 'שדה השם חייב להיות מלא',
        nameMustBeAtLeastCharactersLong:'השם חייב להיות בעל לפחות 2 תווים',
        nameShouldOnlyContainLatinLettersCyrillicLettersSpacesOrHyphens: 'השם צריך להכיל רק אותיות לטיניות, אותיות קיריליות, רווחים או מקפים',
        nameShouldNotExceedCharacters:'השם לא יכול להכיל יותר מ-30 תווים',

    },
    errorDreamLinkMessage:{
        invalidLink:'קישור לא תקין'
    },
    img:{
        buttonTextUploaded: 'הועלה',
        buttonTextUploadPictureOfYourDream: 'העלה תמונה',
    
        errorImgMessage: 'אנא העלה רק קבצי תמונה(jpg, jpeg, png).',
    },
    errorPriceMessage: {
        OnlyNumericInputIsAllowed: 'ניתן להזין רק מספרים',
        PriceCannotStartWith: '0-המחיר אינו יכול להתחיל ב',
        FieldMustBeFilledIn: 'השדה חייב להיות מלא',
        FieldCannotExceedCharacters: 'השדה לא יכול להכיל יותר מ-15 תווים'
    },
}

const choose = { en, rus, hebrew };

export default choose;