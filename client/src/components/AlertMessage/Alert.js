import React from "react";
import clsx from "clsx";

import "./Styles.scss";

import { MdOutlineNearbyError, MdOutlineWarning } from "react-icons/md";

function Alert({ info }) {
    return info === null ? null : (
        <div className={clsx("alert__form", info.type)}>
            <i className="alert__icon">
                {info.type === "danger" ? (
                    <MdOutlineNearbyError className="svg" />
                ) : (
                    <MdOutlineWarning className="svg" />
                )}
            </i>
            <div className="alert__message">{info.message}</div>
        </div>
    );
}

export default Alert;
