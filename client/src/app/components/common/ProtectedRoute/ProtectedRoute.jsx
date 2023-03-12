import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
    getCurrentUserData,
    getIsLoggedIn,
    getUsersLoadingStatus
} from "../../../store/features/usersSlice";

const ProtectedRoute = ({
    children,
    isAdmin,
    to = "/login/signin",
    ...rest
}) => {
    const isLoading = useSelector(getUsersLoadingStatus());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const location = useLocation();
    const currentUser = useSelector(getCurrentUserData());

    if (!isLoading) {
        if (isLoggedIn) {
            if (isAdmin) {
                if (currentUser?.role === "ADMIN") {
                    return children;
                }
            } else {
                return children;
            }
        }
        return <Navigate to={to} state={{ from: location }} />;
    }
};

export default ProtectedRoute;
