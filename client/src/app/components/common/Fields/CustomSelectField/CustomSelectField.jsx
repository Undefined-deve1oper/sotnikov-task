import React from "react";
import IconSvg from "../../IconSvg";

const CustomSelectField = ({
    label,
    value,
    onChange,
    defaultValue,
    options,
    name,
    error,
    className = "",
    icon,
    ...rest
}) => {
    const optionsArray = options.map((option) => ({
        name: option.name,
        value:
            typeof option.value === "object"
                ? JSON.stringify(option.value)
                : option.value
    }));

    const getInputClasses = (hasError) => {
        return "form-select" + (hasError ? " is-invalid" : "");
    };

    return (
        <div className={className + "custom-select"}>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="custom-select__content">
                <select
                    className={getInputClasses(!!error)}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...rest}
                >
                    <option disabled value="">
                        {defaultValue}
                    </option>
                    {optionsArray.length > 0 &&
                        optionsArray.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                </select>
                {icon && <IconSvg name={icon} />}
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default CustomSelectField;
