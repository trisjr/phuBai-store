import clsx from "clsx";
import React, { useContext } from "react";
import { OptionContext } from "../../../../contexts/OptionContext";

import Styles from "./Styles.module.scss";

function DatePicker({ value, name, min, max, onChange }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);

    return (
        <input
            className={clsx(Styles.datePicker, Styles[theme])}
            type="date"
            name={name}
            value={value}
            min={min}
            max={max}
            onChange={onChange}
        />
    );
}

export default DatePicker;
