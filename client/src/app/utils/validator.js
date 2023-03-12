import { getFullYearByTimeStamp } from "./dateHelpers";

export function validator(data, validatorConfig) {
    const errors = {};

    function validate(validateMethod, fieldData, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired": {
                if (typeof fieldData === "boolean") {
                    statusValidate = !fieldData;
                } else {
                    statusValidate = String(fieldData).trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(fieldData);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(fieldData);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(fieldData);
                break;
            }
            case "isCorrectDate": {
                statusValidate = data.toString() === "Invalid Date";
                break;
            }
            case "isAdult": {
                if (fieldData) {
                    const fullYears = getFullYearByTimeStamp(
                        Date.now() - new Date(fieldData).getTime()
                    );
                    statusValidate = fullYears < 18;
                }
                break;
            }
            case "min": {
                if (config.value) {
                    statusValidate = fieldData.length < config.value;
                }
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validateMethod in validatorConfig[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                validatorConfig[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
