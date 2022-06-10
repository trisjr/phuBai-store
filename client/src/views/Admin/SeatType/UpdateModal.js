import clsx from "clsx";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { SeatTypeContext } from "../../../contexts/SeatTypeContext";
import { OptionContext } from "../../../contexts/OptionContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";

function UpdateModel({ _id }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const {
        seatTypeState: { seatType },
        updateSeatType,
        getSeatType,
        setShowUpdateForm,
    } = useContext(SeatTypeContext);
    console.log(seatType);

    const initForm = {
        code: "",
        name: "",
        key: "",
        price: "",
    };
    const [updateForm, setUpdateForm] = useState(initForm);
    const [alert, setAlert] = useState(null);
    const { code, name, key, price } = updateForm;

    const onChangeUpdateForm = (event) => {
        setAlert(null);
        setUpdateForm({
            ...updateForm,
            [event.target.name]: event.target.value,
        });
    };
    const handleUpdateSeatType = async (event) => {
        event.preventDefault();
        const { success, message } = await updateSeatType(_id, updateForm);
        if (success) {
            setShowUpdateForm(false);
        } else {
            setAlert({ type: "danger", message });
        }
    };
    const handleCloseForm = () => {
        setAlert(null);
        setUpdateForm(initForm);
        setShowUpdateForm(false);
    };
    const handleCancel = (event) => {
        event.preventDefault();
        handleCloseForm();
    };
    useEffect(() => {
        if (_id !== "") {
            getSeatType(_id);
        }
        // eslint-disable-next-line
    }, [_id]);
    useEffect(() => {
        setUpdateForm(seatType);
    }, [seatType]);

    const ref = useRef();
    useClickOutSide(ref, () => {
        handleCloseForm();
    });

    return (
        <div className={clsx(ModalStyles.outForm, ModalStyles[theme])}>
            <form
                className={ModalStyles.form}
                onSubmit={handleUpdateSeatType}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Update SeatType</div>
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
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Name</div>
                        <input
                            value={name}
                            placeholder="Enter name..."
                            onChange={onChangeUpdateForm}
                            className={ModalStyles.input}
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Key</div>
                        <input
                            value={key}
                            placeholder="Enter key..."
                            onChange={onChangeUpdateForm}
                            className={ModalStyles.input}
                            name="key"
                            type="text"
                        />
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Price</div>
                        <input
                            value={price}
                            onChange={onChangeUpdateForm}
                            className={ModalStyles.input}
                            name="price"
                            type="number"
                            step="10"
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

export default UpdateModel;
