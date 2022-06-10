import clsx from "clsx";
import React, { useContext, useState, useRef } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { FlightContext } from "../../../contexts/FlightContext";
import { OptionContext } from "../../../contexts/OptionContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";

import { IoReloadSharp } from "react-icons/io5";

function AddModal({ planes, routers, flights }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const { addFlight, setShowAddForm } = useContext(FlightContext);

    const randomNumber = () => {
        return Math.floor(Math.random() * 999) + 1;
    };
    const checkCode = (code) => {
        flights.forEach((item) => {
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
            code = `FL${
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
        router: {
            from: {},
            to: {},
        },
        plane: "",
        start: "",
        end: "",
        price: "",
    };
    const [addForm, setAddForm] = useState(initForm);
    const [alert, setAlert] = useState(null);
    const { code, router, plane, start, end, price } = addForm;

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

    const handleAddFlight = async (event) => {
        event.preventDefault();

        const { success, message } = await addFlight(addForm);
        if (success) {
            setAddForm(initForm);
            setShowAddForm(false);
        } else {
            setAlert({ type: "danger", message });
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
                onSubmit={handleAddFlight}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Add FLight</div>
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
                        <div className={ModalStyles.name}>Router</div>
                        <div className={ModalStyles.select}>
                            <Select
                                list={routers.filter((router) => {
                                    router.value = `${router.from.name} - ${router.to.name}`;
                                    return {
                                        router,
                                    };
                                })}
                                selected={{
                                    _id: router._id,
                                    text: `${router.from.name} - ${router.to.name}`,
                                }}
                                onSelect={(value) => onSelect("router", value)}
                            />
                        </div>
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Plane</div>
                        <div className={ModalStyles.select}>
                            <Select
                                list={planes.filter((plane) => {
                                    plane.value = `${plane.code}`;
                                    return {
                                        plane,
                                    };
                                })}
                                selected={{
                                    _id: plane._id,
                                    text: `${plane.code}`,
                                }}
                                onSelect={(value) => onSelect("plane", value)}
                            />
                        </div>
                    </div>
                    <div className={clsx(ModalStyles.fill)}>
                        <div className={ModalStyles.name}>Start</div>
                        <input
                            value={start}
                            onChange={onChangeAddForm}
                            name="start"
                            className={ModalStyles.input}
                            type="dateTime-local"
                        />
                    </div>
                    <div className={clsx(ModalStyles.fill)}>
                        <div className={ModalStyles.name}>End</div>
                        <input
                            value={end}
                            onChange={onChangeAddForm}
                            name="end"
                            className={ModalStyles.input}
                            type="dateTime-local"
                            min={start}
                        />
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Code</div>
                        <input
                            value={price}
                            placeholder="Enter price..."
                            onChange={onChangeAddForm}
                            name="price"
                            className={ModalStyles.input}
                            type="number"
                            step={50}
                        />
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
