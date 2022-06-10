import React, { useContext, useState } from "react";

import LoginStyles from "./LoginStyles.module.scss";
import Button from "../../../components/lib/Button/Button";
import TextField from "../../../components/lib/TextField/TextField";
import { useTitle } from "../../../hooks/useTitle";
import { AuthContext } from "../../../contexts/AuthContext";

import { MdEmail, MdLock } from "react-icons/md";

function Login() {
  useTitle("Login");
  const { loginUser } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginForm;

  const handleAction = (action, value) => {
    switch (action) {
      case "handleChangeEmail": {
        setLoginForm({
          ...loginForm,
          email: value,
        });
        break;
      }
      case "handleChangePassword": {
        setLoginForm({
          ...loginForm,
          password: value,
        });
        break;
      }

      default:
        return;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);

      if (!loginData.success) {
        console.log(loginData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={LoginStyles["login"]}>
      <form className={LoginStyles["loginForm"]} onSubmit={handleLogin}>
        <div className={LoginStyles["title"]}>Login</div>
        <div className={LoginStyles["fill"]}>
          <div className={LoginStyles["fillEmail"]}>
            <i className={LoginStyles["icon"]}>
              <MdEmail />
            </i>
            <TextField
              value={email}
              name={"email"}
              title={"Email"}
              autoComplete
              width={380}
              onChange={(value) => handleAction("handleChangeEmail", value)}
            />
          </div>
          <div className={LoginStyles["fillPassword"]}>
            <i className={LoginStyles["icon"]}>
              <MdLock />
            </i>
            <TextField
              value={password}
              name={"password"}
              type={"password"}
              title={"Password"}
              width={380}
              autoComplete
              onChange={(value) => handleAction("handleChangePassword", value)}
            />
          </div>
          <div className={LoginStyles["action"]}>
            <Button variant={"contained"} type={"submit"}>
              Login
            </Button>
          </div>
        </div>
        <div className={LoginStyles["other"]}>
          <div className={LoginStyles["text"]}>Don't have a Account?</div>
          <Button
            variant={"contained"}
            color={"warning"}
            size={"small"}
            href={"/register"}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
