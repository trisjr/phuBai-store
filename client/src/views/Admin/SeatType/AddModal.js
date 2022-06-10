import clsx from "clsx";
import React, { useContext, useState, useRef } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { OptionContext } from "../../../contexts/OptionContext";
import { SeatTypeContext } from "../../../contexts/SeatTypeContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";

function AddModal() {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const { addSeatType, setShowAddForm } = useContext(SeatTypeContext);

    const initState = {
        code: "",
        name: "",
        key: "",
        price: 0,
    };
    const [addForm, setAddForm] = useState(initState);
    const [alert, setAlert] = useState(null);
    const { code, name, key, price } = addForm;

    const onChangeAddForm = (event) => {
        setAlert(null);
        setAddForm({
            ...addForm,
            [event.target.name]: event.target.value,
        });
    };
    const handleAddSeatType = async (event) => {
        event.preventDefault();
        const { success, message } = await addSeatType(addForm);
        if (success) {
            setAddForm(initState);
            setShowAddForm(false);
        } else {
            setAlert({ type: "danger", message });
        }
    };

    const handleCloseForm = () => {
        setAlert(null);
        setAddForm(initState);
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
                onSubmit={handleAddSeatType}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Add Seat Type</div>
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
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Name</div>
                        <input
                            value={name}
                            placeholder="Enter name..."
                            onChange={onChangeAddForm}
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
                            onChange={onChangeAddForm}
                            className={ModalStyles.input}
                            name="key"
                            type="text"
                        />
                    </div>
                    <div className={ModalStyles.fill}>
                        <div className={ModalStyles.name}>Price</div>
                        <input
                            value={price}
                            onChange={onChangeAddForm}
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
