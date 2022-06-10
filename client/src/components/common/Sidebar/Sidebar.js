import React, { useContext } from "react";

import Styles from "./Styles.module.scss";
import { AuthContext } from "../../../contexts/AuthContext";
import AdminSidebar from "../../admin/AdminSidebar/AdminSidebar";

function Sidebar() {
    const {
        authState: { user, isAuthenticated },
    } = useContext(AuthContext);

    if (isAuthenticated && (user.role === "ADMIN" || user.role === "DEV")) {
        return <AdminSidebar Styles={Styles} />;
    } else {
        return <></>;
    }
}

export default Sidebar;
