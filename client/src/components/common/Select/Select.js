import clsx from "clsx";
import React, { useContext, useEffect, useRef, useState } from "react";

import Styles from "./Styles.module.scss";
import { OptionContext } from "../../../contexts/OptionContext";

import { IoCaretDown, IoCaretUp } from "react-icons/io5";

function Select({ list, selected, onSelect }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const ref1 = useRef();
    const ref2 = useRef();

    const ref3 = useRef();
    useEffect(() => {
        ref3.current?.scrollIntoView();
    }, [open]);

    useOnClickOutside(ref1, ref2, () => setOpen(false));

    return (
        <div className={clsx(Styles.select, Styles[theme])}>
            <div
                className={Styles.select__header}
                ref={ref1}
                onClick={handleOpen}
            >
                <div className={Styles.selected}>
                    {selected._id !== undefined
                        ? selected.text
                        : "Click to select..."}
                </div>
                <i className={Styles.icon}>
                    {open ? (
                        <IoCaretUp className={Styles.svg} />
                    ) : (
                        <IoCaretDown className={Styles.svg} />
                    )}
                </i>
            </div>
            <div
                className={clsx(
                    Styles.select__wrapper,
                    open ? Styles.open : Styles.close,
                    list.length < 4 ? Styles.short : null
                )}
                ref={ref2}
            >
                {list.map((item, index) => (
                    <div
                        className={clsx(
                            Styles.item,
                            item._id === selected._id ? Styles.active : null,
                            index % 2 === 1 ? Styles.dark : null
                        )}
                        ref={item._id === selected._id ? ref3 : null}
                        key={index}
                        onClick={() => {
                            setOpen(false);
                            onSelect(item);
                        }}
                    >
                        {item.value}
                    </div>
                ))}
            </div>
        </div>
    );
}

function useOnClickOutside(ref1, ref2, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (
                !ref1.current ||
                ref1.current.contains(event.target) ||
                !ref2.current ||
                ref2.current.contains(event.target)
            ) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref1, ref2, handler]);
}

export default Select;
