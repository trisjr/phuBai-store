import clsx from "clsx";
import React, { useContext } from "react";
import { OptionContext } from "../../../contexts/OptionContext";

import Styles from "./Styles.module.scss";

function ToggleButton({ value, list, handleChangeValue }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);

    return (
        <div className={clsx(Styles.toggleButton, Styles[theme])}>
            {list.map((item, index) => (
                <div
                    className={clsx(
                        Styles.btn,
                        item.value === value ? Styles.active : null
                    )}
                    key={index}
                    onClick={() => handleChangeValue(item.value)}
                >
                    {item.icon ? (
                        <i className={Styles.icon}>{item.icon}</i>
                    ) : null}
                    <div className={Styles.text}>{item.value}</div>
                </div>
            ))}
        </div>
    );
}

export default ToggleButton;
