import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Protected({ element }) {
    const {
        authState: { authLoading, isAuthenticated, user },
    } = useContext(AuthContext);

    if (authLoading) {
        return <></>;
    } else {
        if (isAuthenticated) {
            if (user.role === "ADMIN" || user.role === "DEV") {
                if (window.location.pathname.includes("admin")) {
                    return <>{element}</>;
                } else {
                    return <Navigate to="/admin" />;
                }
            } else {
                if (window.location.pathname.includes("admin")) {
                    return <Navigate to="/dashboard" />;
                } else {
                    return <>{element}</>;
                }
            }
        } else {
            return <Navigate to="/login" />;
        }
    }
}

export default Protected;
