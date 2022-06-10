import clsx from "clsx";
import React, { useContext, useState, useRef } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { PlaneContext } from "../../../contexts/PlaneContext";
import { OptionContext } from "../../../contexts/OptionContext";
import { SeatContext } from "../../../contexts/SeatContext";
import ToggleButton from "../../../components/common/ToggleButton/ToggleButton";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";

import { IoReloadSharp } from "react-icons/io5";

function AddModal({ airlines, planes, seatTypes }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);

    const { addSeat } = useContext(SeatContext);

    const { addPlane, setShowAddForm } = useContext(PlaneContext);
    const initValue = {
        code: "",
        airline: "",
        status: true,
    };
    const [addForm, setAddForm] = useState(initValue);
    const [alert, setAlert] = useState(null);
    const { code, airline, status } = addForm;

    const randomNumber = () => {
        return Math.floor(Math.random() * 999) + 1;
    };
    const checkCode = (code) => {
        planes.forEach((item) => {
            if (item.code === code) {
                return true;
            }
        });
        return false;
    };
    const randomCode = (key) => {
        let code;
        do {
            let num = randomNumber();
            code = `${key ? key : airline.code}${
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
            code: randomCode(value.code),
            [name]: value,
        });
    };

    const handleAddSeatForPlane = async (plane) => {
        for (let index = 0; index < seatTypes.length; index++) {
            if (seatTypes[index].code === "business") {
                for (let i = 1; i <= 8; i++) {
                    let code = `${seatTypes[index].key}${i < 10 ? "0" + i : i}`;
                    const seatForm = {
                        code: code,
                        plane: plane,
                        seatType: seatTypes[index],
                    };
                    const { success, message } = await addSeat(seatForm);
                    if (!success) {
                        setAlert({ type: "danger", message });
                    }
                }
            }
            if (seatTypes[index].code === "economy") {
                for (let i = 1; i <= 20; i++) {
                    let code = `${seatTypes[index].key}${i < 10 ? "0" + i : i}`;
                    const seatForm = {
                        code: code,
                        plane: plane,
                        seatType: seatTypes[index],
                    };
                    const { success, message } = await addSeat(seatForm);
                    if (!success) {
                        setAlert({ type: "danger", message });
                    }
                }
            }
            if (seatTypes[index].code === "first-class") {
                for (let i = 1; i <= 4; i++) {
                    let code = `${seatTypes[index].key}${i < 10 ? "0" + i : i}`;
                    const seatForm = {
                        code: code,
                        plane: plane,
                        seatType: seatTypes[index],
                    };
                    const { success, message } = await addSeat(seatForm);
                    if (!success) {
                        setAlert({ type: "danger", message });
                    }
                }
            }
            if (seatTypes[index].code === "premium-economy") {
                for (let i = 1; i <= 14; i++) {
                    let code = `${seatTypes[index].key}${i < 10 ? "0" + i : i}`;
                    const seatForm = {
                        code: code,
                        plane: plane,
                        seatType: seatTypes[index],
                    };
                    const { success, message } = await addSeat(seatForm);
                    if (!success) {
                        setAlert({ type: "danger", message });
                    }
                }
            }
        }
    };

    const handleAddPlane = async (event) => {
        event.preventDefault();
        const { success, message, plane } = await addPlane(addForm);
        if (success) {
            await handleAddSeatForPlane(plane);
            setAddForm(initValue);
            setShowAddForm(false);
        } else {
            setAlert({ type: "danger", message });
        }
    };

    const handleCloseForm = () => {
        setAlert(null);
        setAddForm(initValue);
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
                onSubmit={handleAddPlane}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Add Plane</div>
                </div>
                <Alert info={alert} />
                <div className={ModalStyles.body}>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Airline</div>
                        <div className={ModalStyles.select}>
                            <Select
                                list={airlines.filter((airline) => {
                                    airline.value = `${airline.name} (${airline.code})`;
                                    return {
                                        airline,
                                    };
                                })}
                                selected={{
                                    _id: airline._id,
                                    text: airline.name,
                                }}
                                onSelect={(value) => onSelect("airline", value)}
                            />
                        </div>
                    </div>
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
                        {code ? (
                            <i
                                className={ModalStyles.icon}
                                onClick={handleRandomCode}
                            >
                                <IoReloadSharp className={ModalStyles.svg} />
                            </i>
                        ) : null}
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Status</div>
                        <ToggleButton
                            value={status ? "YES" : "NO"}
                            list={[{ value: "YES" }, { value: "NO" }]}
                            handleChangeValue={(value) => {
                                setAddForm({
                                    ...addForm,
                                    status: value === "YES" ? true : false,
                                });
                            }}
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
