import clsx from "clsx";
import React, { useContext, useState, useRef } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { AirportContext } from "../../../contexts/AirportContext";
import Alert from "../../../components/AlertMessage/Alert";
import { OptionContext } from "../../../contexts/OptionContext";
import Button from "../../../components/common/Button/Button";

function AddModal() {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const { addAirport, setShowAddForm } = useContext(AirportContext);

    const initState = {
        code: "",
        name: "",
        province: "",
    };
    const [addForm, setAddForm] = useState(initState);
    const [alert, setAlert] = useState(null);
    const { code, name, province } = addForm;

    const onChangeAddForm = (event) => {
        setAlert(null);
        setAddForm({
            ...addForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddAirport = async (event) => {
        event.preventDefault();

        const { success, message } = await addAirport(addForm);
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
                onSubmit={handleAddAirport}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Add Airport</div>
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
                        <div className={ModalStyles.name}>Province</div>
                        <input
                            value={province}
                            placeholder="Enter province..."
                            onChange={onChangeAddForm}
                            className={ModalStyles.input}
                            name="province"
                            type="text"
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
