export const validatorConfig = {
    email: {
        isRequired: {
            message: "Email обязателен для заполнения"
        },
        isEmail: {
            message: "Email введен некоректно"
        }
    },
    name: {
        isRequired: {
            message: "Имя не может быть пустым"
        }
    },
    message: {
        isRequired: {
            message: "Сообщение обязательно для заполнения"
        }
    },
    cause: {
        isRequired: {
            message: "Причина обязательна для заполнения"
        }
    }
};
