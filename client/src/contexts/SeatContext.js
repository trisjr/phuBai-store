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
import { seatReducer } from "../reducers/seatReducer";

export const SeatContext = createContext(undefined);

const SeatContextProvider = ({ children }) => {
    const [seatState, dispatch] = useReducer(
        seatReducer,
        {
            seats: [],
            seatsLoading: true,
            seat: {
                code: "",
                plane: "",
                seatType: "",
            },
            seatLoading: true,
        },
        undefined
    );
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getSeats = async () => {
        try {
            const response = await axios.get(`${apiUrl}/seat`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.seats,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getSeat = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/seat/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.seat,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addSeat = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/seat`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.seat,
                });
                return response.data;
            }
            await getSeats();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteSeat = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/seat/${_id}`);
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
    const updateSeat = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/seat/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.seat,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const seatContextData = {
        seatState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getSeats,
        getSeat,
        addSeat,
        deleteSeat,
        updateSeat,
    };

    return (
        <SeatContext.Provider value={seatContextData}>
            {children}
        </SeatContext.Provider>
    );
};

export default SeatContextProvider;
