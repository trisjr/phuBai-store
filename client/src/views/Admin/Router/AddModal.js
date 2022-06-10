import clsx from "clsx";
import React, { useContext, useState, useRef } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { RouterContext } from "../../../contexts/RouterContext";
import { OptionContext } from "../../../contexts/OptionContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";

import { IoReloadSharp } from "react-icons/io5";

function AddModal({ airports, routers }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const { addRouter, setShowAddForm } = useContext(RouterContext);
    const randomNumber = () => {
        return Math.floor(Math.random() * 999) + 1;
    };
    const checkCode = (code) => {
        routers.forEach((item) => {
            if (item.code === code) {
                return true;
            }
        });
        return false;
    };
    const randomCode = () => {
        let code;
        do {
            let num = randomNumber();
            code = `RT${
                num < 1000
                    ? num < 100
                        ? num < 10
                            ? "000"
                            : "00"
                        : "0"
                    : null
            }${num}`;
        } while (checkCode(code));
        return code;
    };

    const initForm = {
        code: randomCode(),
        from: "",
        to: "",
    };
    const [addForm, setAddForm] = useState(initForm);
    const [alert, setAlert] = useState(null);
    const { code, from, to } = addForm;

    const handleRandomCode = () => {
        setAddForm({
            ...addForm,
            code: randomCode(),
        });
    };

    const onChangeAddForm = (event) => {
        setAlert(null);
        setAddForm({
            ...addForm,
            [event.target.name]: event.target.value,
        });
    };
    const onSelect = (name, value) => {
        setAlert(null);
        setAddForm({
            ...addForm,
            [name]: value,
        });
    };

    const handleAddRouter = async (event) => {
        event.preventDefault();

        if (from !== to) {
            const { success, message } = await addRouter(addForm);
            if (success) {
                setAddForm(initForm);
                setShowAddForm(false);
            } else {
                setAlert({ type: "danger", message });
            }
        } else {
            setAlert({ type: "danger", message: "Invalid information!" });
        }
    };

    const handleCloseForm = () => {
        setAlert(null);
        setAddForm(initForm);
        setShowAddForm(false);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        handleCloseForm();
    };

    const ref = useRef();

    useClickOutSide(ref, () => {
        handleCloseForm();
    });

    return (
        <div className={clsx(ModalStyles.outForm, ModalStyles[theme])}>
            <form
                className={ModalStyles.form}
                onSubmit={handleAddRouter}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Add Router</div>
                </div>
                <Alert info={alert} />
                <div className={ModalStyles.body}>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Code</div>
                        <input
                            value={code}
                            placeholder="Enter code..."
                            onChange={onChangeAddForm}
                            name="code"
                            className={ModalStyles.input}
                            type="text"
                        />
                        <i
                            className={ModalStyles.icon}
                            onClick={handleRandomCode}
                        >
                            <IoReloadSharp className={ModalStyles.svg} />
                        </i>
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>From</div>
                        <div className={ModalStyles.select}>
                            <Select
                                list={airports.filter((airport) => {
                                    airport.value = `${airport.name} (${airport.code})`;
                                    return {
                                        airport,
                                    };
                                })}
                                selected={{
                                    _id: from._id,
                                    text: `${from.name}`,
                                }}
                                onSelect={(value) => onSelect("from", value)}
                            />
                        </div>
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>To</div>
                        <div className={ModalStyles.select}>
                            <Select
                                list={airports.filter((airport) => {
                                    airport.value = `${airport.name} (${airport.code})`;
                                    return {
                                        airport,
                                    };
                                })}
                                selected={{
                                    _id: to._id,
                                    text: `${to.name}`,
                                }}
                                onSelect={(value) => onSelect("to", value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={ModalStyles.action}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleCancel}
                        size="small"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddModal;
