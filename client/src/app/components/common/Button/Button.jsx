import React from "react";

const Button = ({ children, type, className = "", ...rest }) => {
    return (
        <button
            type={type || "button"}
            className={className + " btn"}
            {...rest}
        >
            {children}
        </button>
    );
};
export default Button;
