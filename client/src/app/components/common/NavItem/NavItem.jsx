import React from "react";
import { NavLink } from "react-router-dom";
import IconSvg from "../IconSvg";

const NavItem = ({ route }) => {
    return (
        <li className="menu__item">
            <NavLink
                className={({ isActive }) =>
                    `menu__link ${isActive ? "_active" : ""}`
                }
                to={route.path}
            >
                {route.icon && <IconSvg name={route.icon} svgClass={"icon"} />}
                <span>{route.item}</span>
            </NavLink>
        </li>
    );
};

export default NavItem;
