import clsx from "clsx";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutSide";

import ModalStyles from "../../Styles/ModalStyles.module.scss";
import { AirlineContext } from "../../../contexts/AirlineContext";
import { OptionContext } from "../../../contexts/OptionContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";

function UpdateModal({ _id }) {
  const {
    optionState: { theme },
  } = useContext(OptionContext);
  const {
    airlineState: { airline },
    updateAirline,
    getAirline,
    setShowUpdateForm,
  } = useContext(AirlineContext);

  const initState = {
    code: "",
    name: "",
    logo: "",
  };
  const [updateForm, setUpdateForm] = useState(initState);
  const [alert, setAlert] = useState(null);
  const { code, name, logo } = updateForm;

  const onChangeUpdateForm = (event) => {
    setAlert(null);
    setUpdateForm({
      ...updateForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateAirline = async (event) => {
    event.preventDefault();
    const { success, message } = await updateAirline(_id, updateForm);
    if (success) {
      setShowUpdateForm(false);
    } else {
      setAlert({ type: "danger", message });
    }
  };

  const handleCloseForm = () => {
    setAlert(null);
    setUpdateForm(airline);
    setShowUpdateForm(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    handleCloseForm();
  };

  useEffect(() => {
    if (_id !== "") {
      getAirline(_id);
    }
    // eslint-disable-next-line
  }, [_id]);
  useEffect(() => {
    setUpdateForm(airline);
  }, [airline]);

  const ref = useRef();

  useClickOutSide(ref, () => {
    handleCloseForm();
  });

  function encodeImageFileAsURL(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setAlert(null);
      setUpdateForm({
        ...updateForm,
        logo: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={clsx(ModalStyles.outForm, ModalStyles[theme])}>
      <form
        className={ModalStyles.form}
        onSubmit={handleUpdateAirline}
        ref={ref}
      >
        <div className={ModalStyles.header}>
          <div className={ModalStyles.title}>Update Airline</div>
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
