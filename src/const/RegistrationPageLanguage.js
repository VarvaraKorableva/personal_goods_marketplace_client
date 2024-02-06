const en = {
    greetingsRegistration: 'Registration',
    greetings: 'Welcome!',
    greetingsText: 'You can register here',
    name: 'Name',
    email: 'E-mail',
    password: 'Password',
    button: 'SignUp',
    question: 'Already signUp?',
    signin: 'SignIn',

    mistakesName: {
        theUsernameFieldMustBeFilledIn: 'The username field must be filled in.',
        theUsernameMustBeAtLeastCharactersLong: 'The username must be at least 2 characters long.',
        theUsernameShouldOnlyContainLatinLettersCyrillicLetters: 'The username should only contain Latin letters, Cyrillic letters, spaces, or hyphens.',
        usernameMustBeNoMoreThan: 'Username must be no more than 30 characters.',
    },

    mistakesPassword: {
        passwordMustBeFilledIn: 'Password must be filled in.',
        passwordMustContainAtLeast: 'Password must contain at least 5 characters.',
        passwordMustNotExceed: 'Password must not exceed 8 characters.',
    },

    mistakesEmail: {
        emailMustBeFilledIn: 'Email must be filled in.',
        invalidEmailFormat: 'Invalid email format.',
    },
}

const rus = {
    greetings: 'Привет!',
    greetingsText: 'Здесь можно зарегистрироваться',

    name: 'Имя',
    email: 'Электронная почта',
    password: 'Пароль',

    button: 'Зарегистрироваться',

    question: 'Уже зарегистрированы?',

    signin: 'Войти',

    mistakesName: {
        theUsernameFieldMustBeFilledIn: 'Имя должно быть заполнено',
        theUsernameMustBeAtLeastCharactersLong: 'Имя пользователя должно быть длиной не менее 2 символов.',
        theUsernameShouldOnlyContainLatinLettersCyrillicLetters: 'Имя пользователя должно содержать только латинские буквы, кириллические буквы, пробелы или дефисы.',
        usernameMustBeNoMoreThan: 'Имя пользователя должно быть не более 30 символов.',
    },

    mistakesPassword: {
        passwordMustBeFilledIn: 'Поле пароля должно быть заполнено.',
        passwordMustContainAtLeast: 'Пороль должен быть не менее 5 символов.',
        passwordMustNotExceed: 'Пароль должен быть не более 8 символов.',
    },

    mistakesEmail: {
        emailMustBeFilledIn: 'Поле должно быть заполнено.',
        invalidEmailFormat: 'Неправильный формат электронной почты.',
    },
}

const hebrew = {
    greetings: '! ברוך הבא',

    greetingsText: 'כאן ניתן להירשם',

    name: 'שם',
    email: 'דוא"ל',
    password: 'סיסמה',

    button: 'הירשם',

    question: '? כבר נרשמת',

    signin: "התחברות",

    mistakesName: {
        theUsernameFieldMustBeFilledIn: '.שדה שם המשתמש חייב להיות מלא',
        theUsernameMustBeAtLeastCharactersLong: '.שם המשתמש חייב להיות באורך של לפחות 2 תווים',
        theUsernameShouldOnlyContainLatinLettersCyrillicLetters: '.שם המשתמש יכול להכיל רק אותיות לטיניות, אותיות קיריליות, רווחים או מקפים',
        usernameMustBeNoMoreThan: '.שם המשתמש חייב להיות בעל לפחות 30 תווים',
    },

    mistakesPassword: {
        passwordMustBeFilledIn: '.יש למלא את הסיסמה',
        passwordMustContainAtLeast: '.יש להזין לפחות 5 תווים בסיסמה',
        passwordMustNotExceed: '.הסיסמה לא יכולה להכיל יותר מ-8 תווים',
    },

    mistakesEmail: {
        emailMustBeFilledIn: '.יש למלא את האימייל',
        invalidEmailFormat: '.פורמט האימייל אינו תקין',
    },
}

const choose = { en, rus, hebrew };

export default choose;