import React, { useState } from "react";
import IconSvg from "../../IconSvg";
import Button from "../../Button";
import "./styles/text-field.css";

const TextField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    error = null,
    className = "",
    icon,
    title,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleChange = (e) => {
        onChange?.({ target: { name, value: e.target.value } });
    };

    return (
        <div className={className + ` text-field ${error ? " error" : ""}`}>
            {title && <h3 className="text-field__title form-title">{title}</h3>}
            <div className="text-field__content">
                {type === "password" ? (
                    <>
                        <input
                            name={name}
                            id={name}
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            value={value}
                            placeholder={label}
                            className={`text-field__input`}
                            {...rest}
                        />
                        {icon && (
                            <Button
                                className="text-field__icon"
                                onClick={handleShowPassword}
                            >
                                <IconSvg name={icon} />
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        <input
                            name={name}
                            id={name}
                            type={type}
                            onChange={handleChange}
                            value={value}
                            placeholder={label}
                            className={`text-field__input`}
                            {...rest}
                        />
                        {icon && (
                            <Button className="text-field__icon">
                                <IconSvg name={icon} />
                            </Button>
                        )}
                    </>
                )}
            </div>
            {error && <p className="text-field__error error">{error}</p>}
        </div>
    );
};

export default React.memo(TextField);
