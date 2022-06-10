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
import { seatTypeReducer } from "../reducers/seatTypeReducer";

export const SeatTypeContext = createContext(undefined);

const SeatTypeContextProvider = ({ children }) => {
    const [seatTypeState, dispatch] = useReducer(seatTypeReducer, {
        seatTypes: [],
        seatTypesLoading: true,
        seatType: {
            code: "",
            name: "",
            key: "",
            price: "",
        },
        seatTypeLoading: true,
    }, undefined);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getSeatTypes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/seatType`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.seatTypes,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getSeatType = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/seatType/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.seatType,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addSeatType = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/seatType`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.seatType,
                });
                return response.data;
            }
            await getSeatTypes();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteSeatType = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/seatType/${_id}`);
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
    const updateSeatType = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/seatType/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.seatType,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const seatTypeContextData = {
        seatTypeState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getSeatTypes,
        getSeatType,
        addSeatType,
        deleteSeatType,
        updateSeatType,
    };

    return (
        <SeatTypeContext.Provider value={seatTypeContextData}>
            {children}
        </SeatTypeContext.Provider>
    );
};

export default SeatTypeContextProvider;
