import React, { useContext, useState } from "react";

import Styles from "../Styles.module.scss";
import Alert from "../../../components/AlertMessage/Alert";
import { AuthContext } from "../../../contexts/AuthContext";

import { MdEmail, MdLock } from "react-icons/md";
import Button from "../../../components/common/Button/Button";
import { Link } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";

function Register() {
    useTitle("Register");
    const { registerUser } = useContext(AuthContext);
    const [registerForm, setRegisterForm] = useState({
        email: "",
        password: "",
        rePassword: "",
        fullName: "",
    });
    const [alert, setAlert] = useState(null);
    const { email, password, rePassword, fullName } = registerForm;

    const handleChangeRegisterForm = (event) => {
        if (alert) {
            setAlert(null);
        }
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        console.log(registerForm);

        if (password !== rePassword) {
            setAlert({ type: "danger", message: "Re-Password don't match!" });
        } else {
            try {
                const registerData = await registerUser(registerForm);
                if (!registerData.success) {
                    setAlert({ type: "danger", message: registerData.message });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={Styles.landing}>
            <div className={Styles.register}>
                <div className={Styles.title}>Register</div>
                <form className={Styles.registerForm} onSubmit={handleRegister}>
                    <Alert info={alert} />
                    <div className={Styles.fill}>
                        <div className={Styles.item}>
                            <label className={Styles.label} htmlFor="email">
                                Email
                            </label>
                            <i className={Styles.icon}>
                                <MdEmail className={Styles.svg} />
                            </i>
                            <input
                                className={Styles.input}
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Enter email..."
                                value={email}
                                onChange={handleChangeRegisterForm}
                            />
                        </div>
                        <div className={Styles.item}>
                            <label className={Styles.label} htmlFor="password">
                                Password
                            </label>
                            <i className={Styles.icon}>
                                <MdLock className={Styles.svg} />
                            </i>
                            <input
                                className={Styles.input}
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="on"
                                placeholder="Enter password..."
                                value={password}
                                onChange={handleChangeRegisterForm}
                            />
                        </div>
                        <div className={Styles.item}>
                            <label
                                className={Styles.label}
                                htmlFor="rePassword"
                            >
                                Re-Password
                            </label>
                            <i className={Styles.icon}>
                                <MdLock className={Styles.svg} />
                            </i>
                            <input
                                className={Styles.input}
                                id="rePassword"
                                type="password"
                                name="rePassword"
                                autoComplete="on"
                                placeholder="Enter re-Password..."
                                value={rePassword}
                                onChange={handleChangeRegisterForm}
                            />
                        </div>
                        <div className={Styles.item}>
                            <label className={Styles.label} htmlFor="fullName">
                                FullName
                            </label>
                            <i className={Styles.icon}>
                                <MdLock className={Styles.svg} />
                            </i>
                            <input
                                className={Styles.input}
                                id="fullName"
                                type="text"
                                name="fullName"
                                placeholder="Enter FullName..."
                                value={fullName}
                                onChange={handleChangeRegisterForm}
                            />
                        </div>
                    </div>
                    <div className={Styles.action}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                </form>
                <div className={Styles.other}>
                    <div>You have a Account?</div>
                    <Link to="/login">
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                        >
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
