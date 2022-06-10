import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Landing() {
    const {
        authState: { isAuthenticated, user },
    } = useContext(AuthContext);
    if (isAuthenticated) {
        if (user.role === "ADMIN" || user.role === "DEV") {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/home" />;
        }
    } else {
        return <Navigate to="/login" />;
    }
}

export default Landing;
