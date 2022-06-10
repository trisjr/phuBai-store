import clsx from "clsx";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { AirportContext } from "../../../contexts/AirportContext";
import { OptionContext } from "../../../contexts/OptionContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";

function UpdateModal({ _id }) {
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const {
        airportState: { airport },
        updateAirport,
        getAirport,
        setShowUpdateForm,
    } = useContext(AirportContext);

    const initForm = {
        code: "",
        name: "",
        province: "",
    };
    const [updateForm, setUpdateForm] = useState(initForm);
    const [alert, setAlert] = useState(null);

    const { code, name, province } = updateForm;

    const onChangeUpdateForm = (event) => {
        setAlert(null);
        setUpdateForm({
            ...updateForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdateAirport = async (event) => {
        event.preventDefault();

        const { success, message } = await updateAirport(_id, updateForm);
        if (success) {
            setShowUpdateForm(false);
        } else {
            setAlert({ type: "danger", message });
        }
    };

    const handleCloseForm = () => {
        setAlert(null);
        setUpdateForm(airport);
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

    useEffect(() => {
        if (_id !== "") {
            getAirport(_id);
        }
        // eslint-disable-next-line
    }, [_id]);
    useEffect(() => {
        setUpdateForm(airport);
    }, [airport]);

    return (
        <div className={clsx(ModalStyles.outForm, ModalStyles[theme])}>
            <form
                className={ModalStyles.form}
                onSubmit={handleUpdateAirport}
                ref={ref}
            >
                <div className={ModalStyles.header}>
                    <div className={ModalStyles.title}>Update Airport</div>
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
                        <div className={ModalStyles.name}>Province</div>
                        <input
                            value={province}
                            placeholder="Enter province..."
                            onChange={onChangeUpdateForm}
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
