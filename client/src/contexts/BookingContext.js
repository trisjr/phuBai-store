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
import { bookingReducer } from "../reducers/bookingReducer";

export const BookingContext = createContext(undefined);

const BookingContextProvider = ({ children }) => {
    const [bookingState, dispatch] = useReducer(
        bookingReducer,
        {
            bookings: [],
            bookingsLoading: true,
            booking: {
                flight: "",
                seat: "",
                user: "",
                customer: "",
                status: "",
            },
            bookingLoading: true,
        },
        undefined
    );
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getBookings = async () => {
        try {
            const response = await axios.get(`${apiUrl}/booking`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.bookings,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getBooking = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/booking/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.booking,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addBooking = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/booking`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.booking,
                });
                addForm._id = response.data.booking._id
                return {
                    success: true,
                    booking: addForm
                };
            }
            await getBookings();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteBooking = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/booking/${_id}`);
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
    const updateBooking = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/booking/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.booking,
                });
                return response.data;
            }
        } catch (error) {
            return error.response?.data
                ? error.response?.data
                : { success: false, message: "Server Error!" };
        }
    };

    const bookingContextData = {
        bookingState,
        showBookingForm,
        setShowBookingForm,
        showUpdateForm,
        setShowUpdateForm,

        getBookings,
        getBooking,
        addBooking,
        deleteBooking,
        updateBooking,
    };

    return (
        <BookingContext.Provider value={bookingContextData}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContextProvider;
