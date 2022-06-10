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
import { flightReducer } from "../reducers/flightReducer";

export const FlightContext = createContext(undefined);

const FlightContextProvider = ({ children }) => {
    const [flightState, dispatch] = useReducer(
        flightReducer,
        {
            flights: [],
            flightsLoading: true,
            flight: {
                code: "",
                router: "",
                plane: "",
                start: "",
                end: "",
                price: "",
            },
            flightLoading: true,
        },
        undefined
    );
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getFlights = async () => {
        try {
            const response = await axios.get(`${apiUrl}/flight`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.flights,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getFlight = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/flight/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.flight,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addFlight = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/flight`, addForm);
            if (response.data.success) {
                addForm._id = response.data.flight._id;
                dispatch({
                    type: ITEM_ADD,
                    payload: addForm,
                });
                return response.data;
            }
            await getFlights();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteFlight = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/flight/${_id}`);
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
    const updateFlight = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/flight/${_id}`,
                updateForm
            );
            if (response.data.success) {
                updateForm._id = response.data.flight._id;
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

    const FlightContextData = {
        flightState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getFlights,
        getFlight,
        addFlight,
        deleteFlight,
        updateFlight,
    };

    return (
        <FlightContext.Provider value={FlightContextData}>
            {children}
        </FlightContext.Provider>
    );
};

export default FlightContextProvider;
