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
import { airlineReducer } from "../reducers/airlineReducer";

export const AirlineContext = createContext(undefined);

const AirlineContextProvider = ({ children }) => {
    const [airlineState, dispatch] = useReducer(airlineReducer, {
        airlines: [],
        airlinesLoading: true,
        airline: {
            code: "",
            name: "",
            logo: "",
        },
        airlineLoading: true,
    }, undefined);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getAirlines = async () => {
        try {
            const response = await axios.get(`${apiUrl}/airline`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.airlines,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getAirline = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/airline/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.airline,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addAirline = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/airline`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.airline,
                });
                return response.data;
            }
            await getAirlines();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteAirline = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/airline/${_id}`);
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
    const updateAirline = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/airline/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.airline,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const airlineContextData = {
        airlineState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getAirlines,
        getAirline,
        addAirline,
        deleteAirline,
        updateAirline,
    };

    return (
        <AirlineContext.Provider value={airlineContextData}>
            {children}
        </AirlineContext.Provider>
    );
};

export default AirlineContextProvider;
