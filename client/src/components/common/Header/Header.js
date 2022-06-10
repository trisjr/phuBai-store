import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import Styles from "./Styles.module.scss";
import AdminNavbar from "../../admin/AdminNavbar/AdminNavbar";
import UserNavbar from "../../user/UserNavbar/UserNavbar";

function Header() {
    const {
        authState: { user, isAuthenticated },
    } = useContext(AuthContext);

    if (isAuthenticated) {
        if (user.role === "ADMIN" || user.role === "DEV") {
            return <AdminNavbar Styles={Styles} />;
        } else {
            return <UserNavbar Styles={Styles} />;
        }
    } else {
        return <></>;
    }
}

export default Header;
