import { createContext, useReducer } from "react";
import { SET_SIDEBAR, SET_THEME } from "../constants/constants";
import { optionReducer } from "../reducers/optionReducer";

export const OptionContext = createContext(undefined);

const OptionContextProvider = ({ children }) => {
    const [optionState, dispatch] = useReducer(optionReducer, {
        theme: localStorage.getItem("theme")
            ? localStorage.getItem("theme")
            : "blue",
        sidebar: localStorage.getItem("sidebar")
            ? localStorage.getItem("sidebar")
            : "open",
    }, undefined);

    const setTheme = (theme) => {
        localStorage.setItem("theme", theme);
        dispatch({
            type: SET_THEME,
            payload: theme,
        });
    };

    const setSidebar = (value) => {
        localStorage.setItem("sidebar", value);
        dispatch({
            type: SET_SIDEBAR,
            payload: value,
        });
    };

    const optionContextData = {
        optionState,
        setTheme,
        setSidebar,
    };

    return (
        <OptionContext.Provider value={optionContextData}>
            {children}
        </OptionContext.Provider>
    );
};

export default OptionContextProvider;
