const en = {
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
        }
    },
}

const rus = {
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
        }
    }, 
}

const hebrew = {
    email: 'אימייל',
    password: 'סיסמה',
    notRegisteredYet: '? עדיין לא רשום',

    signUp: 'הירשם',

    button: 'התחברות',

    errors: {
        passwordMessage: {
          passwordMustBeFilledIn:'יש למלא את הסיסמה',
          passwordMustContainAtLeastCharacters: 'הסיסמה צריכה להכיל לפחות 5 תווים',
          passwordMustNotExceedCharacters: 'הסיסמה לא יכולה להכיל יותר מ-8 תווים',
        },
        emailMessage: {
            emailMustBeFilledIn: 'יש למלא את כתובת האימייל',
            invalidEmailFormat: 'פורמט האימייל אינו תקף',
        }
    }, 
}

const choose = { en, rus, hebrew };

export default choose;