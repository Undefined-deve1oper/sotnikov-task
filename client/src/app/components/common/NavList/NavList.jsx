import React from "react";
import { NavLink } from "react-router-dom";
import { homeIcon } from "../../../assets";
import NavItem from "../NavItem/NavItem";
import "./navlist.css";

const NavList = ({ routes, className }) => {
    return (
        <nav className={className || "menu"}>
            <ul className="menu__list">
                <li className="menu__item main">
                    <NavLink
                        className={({ isActive }) =>
                            `menu__link ${isActive ? "_active" : ""}`
                        }
                        to={"/"}
                    >
                        <img src={homeIcon} alt="home" className="home" />
                    </NavLink>
                </li>
                {routes.map((route) => (
                    <NavItem key={route._id} route={route} />
                ))}
            </ul>
        </nav>
    );
};

export default NavList;
