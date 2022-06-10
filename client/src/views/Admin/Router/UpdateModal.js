import clsx from "clsx";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { RouterContext } from "../../../contexts/RouterContext";
import { OptionContext } from "../../../contexts/OptionContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";
import { IoReloadSharp } from "react-icons/io5";

function UpdateModal({ routers, airports, _id }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const {
        routerState: { router },
        getRouter,
        updateRouter,
        setShowUpdateForm,
    } = useContext(RouterContext);
    const [updateForm, setUpdateForm] = useState({
        code: "",
        from: "",
        to: "",
    });
    const [alert, setAlert] = useState(null);
    const { code, from, to } = updateForm;

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
            [name]: value,
        });
    };

    const handleUpdateRouter = async (event) => {
        event.preventDefault();

        const { success, message } = await updateRouter(_id, updateForm);
        if (success) {
            setShowUpdateForm(false);
        } else {
            setAlert({ type: "danger", message });
        }
    };

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

    const handleRandomCode = () => {
        setUpdateForm({
            ...updateForm,
            code: randomCode(),
        });
    };

    useEffect(() => {
        if (_id !== "") {
            getRouter(_id);
        }
        // eslint-disable-next-line
    }, [_id]);
    useEffect(() => {
        setUpdateForm(router);
    }, [router]);

    const handleCloseForm = () => {
        setAlert(null);
        setUpdateForm(router);
        setShowUpdateForm(false);
    };

    const ref = useRef();
    useClickOutSide(ref, () => {
        handleCloseForm();
    });

    const handleCancel = (event) => {
        event.preventDefault();
        handleCloseForm();
    };

    return (
        <div className={clsx(ModalStyles.outForm, ModalStyles[theme])}>
            <form
                className={ModalStyles.form}
                onSubmit={handleUpdateRouter}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Update Router</div>
                </div>
                <Alert info={alert} />
                <div className={ModalStyles.body}>
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
