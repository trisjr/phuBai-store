import axios from "axios";
import { createContext, useReducer, useState } from "react";

import {
    apiUrl,
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";
import { routerReducer } from "../reducers/routerReducer";

export const RouterContext = createContext(undefined);

const RouterContextProvider = ({ children }) => {
    const [routerState, dispatch] = useReducer(routerReducer, {
        routers: [],
        routersLoading: true,
        router: {
            code: "",
            from: "",
            to: "",
        },
        routerLoading: true,
    }, undefined);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getRouters = async () => {
        try {
            const response = await axios.get(`${apiUrl}/router`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.routers,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getRouter = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/router/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.router,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addRouter = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/router`, addForm);
            if (response.data.success) {
                addForm._id = response.data.router._id;
                dispatch({
                    type: ITEM_ADD,
                    payload: addForm,
                });
                return response.data;
            }
            await getRouters();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteRouter = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/router/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_DELETE,
                    payload: _id,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const updateRouter = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/router/${_id}`,
                updateForm
            );
            if (response.data.success) {
                updateForm._id = response.data.router._id;
                dispatch({
                    type: ITEM_UPDATE,
                    payload: updateForm,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const RouterContextData = {
        routerState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getRouters,
        getRouter,
        addRouter,
        deleteRouter,
        updateRouter,
    };

    return (
        <RouterContext.Provider value={RouterContextData}>
            {children}
        </RouterContext.Provider>
    );
};

export default RouterContextProvider;
