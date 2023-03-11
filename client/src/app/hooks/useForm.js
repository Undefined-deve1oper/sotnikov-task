import React, { useCallback, useState } from "react";
import { validator } from "../utils/validator";

function useForm(initialData, validateOnChange, validatorConfig) {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const validate = useCallback(
        (data) => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [validatorConfig, setErrors]
    );

    const handleChange = useCallback(
        ({ target }) => {
            const nameParts = target.name.split(".");
            const firstLevelName = nameParts[0];
            const secondLevelName = nameParts[1];

            if (nameParts.length === 1) {
                setData((prevData) => ({
                    ...prevData,
                    [firstLevelName]: target.value
                }));
            } else if (nameParts.length === 2 && secondLevelName) {
                setData((prevData) => ({
                    ...prevData,
                    [firstLevelName]: {
                        ...prevData[firstLevelName],
                        [secondLevelName]: target.value
                    }
                }));
            }

            setEnterError(null);
            setErrors({});
            if (validateOnChange) validate({ [target.name]: target.value });
        },
        [validateOnChange, validate, setData, setEnterError, setErrors]
    );

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.currentTarget.form;
            const formElements = [...form.elements].filter(
                (el) =>
                    el.tagName.toLowerCase() === "button" ||
                    el.tagName.toLowerCase() === "input"
            );

            const fieldIndex = Array.prototype.indexOf.call(
                formElements,
                event.currentTarget
            );
            formElements[fieldIndex + 1].focus();
        }
    }, []);

    const handleResetForm = (event) => {
        event.preventDefault();
        setData(initialData);
        setErrors({});
    };

    return {
        data,
        setData,
        errors,
        enterError,
        handleChange,
        handleKeyDown,
        validate,
        handleResetForm
    };
}

export default useForm;
