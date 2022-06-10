import clsx from "clsx";
import React from "react";
import Styles from "./Styles.module.scss";

function Chip({ children, variant, color, size, icon, onClick }) {
    return (
        <div
            className={clsx(
                Styles.chip,
                Styles[variant],
                Styles[color],
                Styles[size]
            )}
            onClick={onClick}
        >
            <div className={Styles.content}>
                {icon ? <i className={Styles.icon}>{icon}</i> : null}
                {children}
            </div>
        </div>
    );
}

export default Chip;
