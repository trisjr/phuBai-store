import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import Styles from "../Styles.module.scss";
import { AuthContext } from "../../../contexts/AuthContext";
import Alert from "../../../components/AlertMessage/Alert";
import Button from "../../../components/common/Button/Button";

import { MdEmail, MdLock } from "react-icons/md";
import { useTitle } from "../../../hooks/useTitle";

function Login() {
    useTitle("Login");
    const { loginUser } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);
    const { email, password } = loginForm;

    const handleChangeLoginForm = (event) => {
        if (alert) {
            setAlert(null);
        }
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);

            if (!loginData.success) {
                setAlert({ type: "danger", message: loginData.message });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={Styles.landing}>
            <div className={Styles.login}>
                <div className={Styles.title}>Login</div>
                <form className={Styles.loginForm} onSubmit={handleLogin}>
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
                                onChange={handleChangeLoginForm}
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
                                onChange={handleChangeLoginForm}
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
                            Login
                        </Button>
                    </div>
                </form>
                <div className={Styles.other}>
                    <div>Don't have a Account?</div>
                    <Link to="/register">
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                        >
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
