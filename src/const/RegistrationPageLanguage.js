const en = {
    greetings: 'Registration',
    greetingsRegistration: 'Registration',
    greetingsText: 'You can register here',
    name: 'Name',
    email: 'E-mail',
    telegram: 'Telegram',
    verificationEmailLabel: "Enter your email address to receive a verification code.",
    emailIsConfirmTitle: 'Your email has been confirmed.',
    secondStepTitle: 'Second step - complete your registration by providing your name and password for login.',
    password: 'Password',
    verificationEmailButton: "Send code to email",
    verificationCodeLabel: 'Enter the code that was sent to your email',
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

    alreadyRegisteredError: 'Email is already registered',
}

const rus = {
    greetings: 'Регистрация в приложении',
    firstStepTitle: 'Первый этап - подтверждение адреса электронной почты',

    emailIsConfirmTitle: 'Ваша почта подтверждена',
    secondStepTitle: 'Второй этап - завершение регистрации, укажите ваше имя и пароль для входа',

    confirmEmailAddress: 'Подтвердить адрес электронной почты',

    name: 'Имя',
    email: 'Электронная почта',
    telegram: 'Telegram',
    verificationEmailLabel: "Введите адрес электронной почты, чтобы получить код для подтверждения",
    password: 'Пароль',
    verificationCodeLabel: 'Введите код, который пришел вам на почту',
    verificationEmailButton: "Отправить код на почту",
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

    alreadyRegisteredError: 'Такой email уже зарегистрирован',
}

const hebrew = {
    greetings: '! ברוך הבא',

    greetingsText: 'כאן ניתן להירשם',

    name: 'שם',
    email: 'דוא"ל',
    password: 'סיסמה',
    telegram: 'Telegram',
    verificationCodeLabel: 'Enter the code that was sent to your email',

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

    alreadyRegisteredError: 'Такой email уже зарегистрирован -изменить',
}

const choose = { en, rus, hebrew };

export default choose;