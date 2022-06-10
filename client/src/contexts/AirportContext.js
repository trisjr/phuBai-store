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
import { airportReducer } from "../reducers/airportReducer";

export const AirportContext = createContext(undefined);

const AirportContextProvider = ({ children }) => {
    const [airportState, dispatch] = useReducer(
        airportReducer,
        {
            airports: [],
            airportsLoading: true,
            airport: {
                code: "",
                name: "",
                province: "",
            },
            airportLoading: true,
        },
        undefined
    );
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getAirports = async () => {
        try {
            const response = await axios.get(`${apiUrl}/airport`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.airports,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getAirport = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/airport/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.airport,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addAirport = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/airport`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.airport,
                });
                return response.data;
            }
            await getAirports();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteAirport = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/airport/${_id}`);
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
    const updateAirport = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/airport/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.airport,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const airportContextData = {
        airportState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getAirports,
        getAirport,
        addAirport,
        deleteAirport,
        updateAirport,
    };

    return (
        <AirportContext.Provider value={airportContextData}>
            {children}
        </AirportContext.Provider>
    );
};

export default AirportContextProvider;
