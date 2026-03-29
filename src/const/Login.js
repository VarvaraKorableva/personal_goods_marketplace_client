const en = {
    title: 'Login',
    email: 'E-mail',
    password: 'Password',
    notRegisteredYet: 'Not registered yet?',

    signUp: 'SignUp',

    button: 'SignIn',

    errors: {
        passwordMessage: {
          passwordMustBeFilledIn:'Password must be filled in.',
          passwordMustContainAtLeastCharacters: 'Password must contain at least 5 characters.',
          passwordMustNotExceedCharacters: 'Password must not exceed 8 characters.',
        },
        emailMessage: {
            emailMustBeFilledIn: 'Email must be filled in.',
            invalidEmailFormat: 'Invalid email format.',
        },
        authenticationError: 'Email or password is not correct, try again',
    },
}

const rus = {
    title: 'Войти в приложение',
    email: 'Электронная почта',
    password: 'Пароль',
    notRegisteredYet: 'Еще не зарегистрированы?',

    signUp: 'Зарегистрироваться',

    button: 'Войти',

    errors: {
        passwordMessage: {
          passwordMustBeFilledIn:'Поле должно быть заполнено',
          passwordMustContainAtLeastCharacters: 'Поле не может быть меньше 5 символов',
          passwordMustNotExceedCharacters: 'Поле не может превышать 8 символов',
        },
        emailMessage: {
            emailMustBeFilledIn: 'Поле должно быть заполнено',
            invalidEmailFormat: 'Неверный формат электронной почты',
        },
        authenticationError: 'Почта или пароль неверные, попробуйте еще раз',
    }, 
}

const hebrew = {
    title: 'התחברות לאפליקציה',
    email: 'אימייל',
    password: 'סיסמה',
    notRegisteredYet: 'עדיין לא רשומים?',

    signUp: 'הרשמה',

    button: 'התחבר',

    errors: {
        passwordMessage: {
          passwordMustBeFilledIn: 'יש למלא את השדה',
          passwordMustContainAtLeastCharacters: 'השדה לא יכול להיות פחות מ-5 תווים',
          passwordMustNotExceedCharacters: 'השדה לא יכול לעלות על 8 תווים',
        },
        emailMessage: {
            emailMustBeFilledIn: 'יש למלא את השדה',
            invalidEmailFormat: 'פורמט אימייל לא תקין',
        },
        authenticationError: 'האימייל או הסיסמה שגויים, נסה שוב',
    },
}

const choose = { en, rus, hebrew };

export default choose;