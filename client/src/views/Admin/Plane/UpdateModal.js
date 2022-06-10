import clsx from "clsx";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { PlaneContext } from "../../../contexts/PlaneContext";
import { OptionContext } from "../../../contexts/OptionContext";
import ToggleButton from "../../../components/common/ToggleButton/ToggleButton";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";
import { IoReloadSharp } from "react-icons/io5";

function UpdateModal({ airlines, planes, _id }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const {
        planeState: { plane },
        getPlane,
        updatePlane,
        setShowUpdateForm,
    } = useContext(PlaneContext);
    const initValue = {
        code: "",
        airline: "",
        status: true,
    };
    const [updateForm, setUpdateForm] = useState(initValue);
    const [alert, setAlert] = useState(null);
    const { code, airline, status } = updateForm;

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
        setUpdateForm({
            ...updateForm,
            code: randomCode(),
        });
    };
    const onChangeUpdateForm = (event) => {
        setAlert(null);
        setUpdateForm({
            ...updateForm,
            [event.target.name]: event.target.value,
        });
    };
    const onSelect = (name, value) => {
        setAlert(null);
        setUpdateForm({
            ...updateForm,
            code: randomCode(value.code),
            [name]: value,
        });
    };

    const handleUpdatePlane = async (event) => {
        event.preventDefault();
        const { success, message } = await updatePlane(_id, updateForm);
        if (success) {
            setUpdateForm(initValue);
            setShowUpdateForm(false);
        } else {
            setAlert({ type: "danger", message });
        }
    };

    useEffect(() => {
        if (_id !== "") {
            getPlane(_id);
        }
        // eslint-disable-next-line
    }, [_id]);
    useEffect(() => {
        setUpdateForm(plane);
    }, [plane]);

    const handleCloseForm = () => {
        setAlert(null);
        setUpdateForm(plane);
        setShowUpdateForm(false);
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
                onSubmit={handleUpdatePlane}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Update Plane</div>
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
                            onChange={onChangeUpdateForm}
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
                        <div className={ModalStyles.name}>Code</div>
                        <ToggleButton
                            value={status ? "YES" : "NO"}
                            list={[{ value: "YES" }, { value: "NO" }]}
                            handleChangeValue={(value) => {
                                setUpdateForm({
                                    ...updateForm,
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
                        Update
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

export default UpdateModal;
