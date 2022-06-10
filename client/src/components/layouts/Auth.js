import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import Login from "../../views/Auth/Login/Login";
import Register from "../../views/Auth/Register/Register";

function Auth({ authRoute }) {
    const {
        authState: { authLoading, isAuthenticated, user },
    } = useContext(AuthContext);
    if (authLoading) {
        return <></>;
    } else {
        if (isAuthenticated) {
            if (user.role === "ADMIN" || user.role === "DEV") {
                return <Navigate to="/admin" />;
            } else {
                return <Navigate to="/dashboard" />;
            }
        } else {
            return authRoute === "login" ? <Login /> : <Register />;
        }
    }
}

export default Auth;
