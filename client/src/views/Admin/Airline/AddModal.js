import clsx from "clsx";
import React, { useContext, useState, useRef } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { AirlineContext } from "../../../contexts/AirlineContext";
import { OptionContext } from "../../../contexts/OptionContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";

function AddModal() {
  const {
    optionState: { theme },
  } = useContext(OptionContext);
  const { addAirline, setShowAddForm } = useContext(AirlineContext);

  const initState = {
    code: "",
    name: "",
    logo: "",
  };
  const [addForm, setAddForm] = useState(initState);
  const [alert, setAlert] = useState(null);
  const { code, name, logo } = addForm;

  const onChangeAddForm = (event) => {
    setAlert(null);
    setAddForm({
      ...addForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseForm = () => {
    setAlert(null);
    setAddForm(initState);
    setShowAddForm(false);
  };

  const handleAddAirline = async (event) => {
    event.preventDefault();

    const { success, message } = await addAirline(addForm);
    if (success) {
      handleCloseForm();
    } else {
      setAlert({ type: "danger", message });
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    handleCloseForm();
  };

  const ref = useRef();

  useClickOutSide(ref, () => {
    handleCloseForm();
  });

  function encodeImageFileAsURL(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setAlert(null);
      setAddForm({
        ...addForm,
        logo: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={clsx(ModalStyles.outForm, ModalStyles[theme])}>
      <form className={ModalStyles.form} onSubmit={handleAddAirline} ref={ref}>
        <div className={ModalStyles.header}>
          <div className={ModalStyles.title}>Add Airline</div>
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
            <div className={ModalStyles.name}>Logo</div>
            <input
              className={ModalStyles.inputFile}
              type="file"
              id="logo"
              name="logo"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                encodeImageFileAsURL(event.target);
              }}
              onClick={(event) => {
                event.target.value = null;
                setAddForm({
                  ...addForm,
                  logo: "",
                });
              }}
            />
            {logo ? (
              <img className={ModalStyles.img} src={logo} alt="logo" />
            ) : null}
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
