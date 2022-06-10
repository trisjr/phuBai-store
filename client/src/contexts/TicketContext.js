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
import { ticketReducer } from "../reducers/ticketReducer";

export const TicketContext = createContext(undefined);

const TicketContextProvider = ({ children }) => {
    const [ticketState, dispatch] = useReducer(
        ticketReducer,
        {
            tickets: [],
            ticketsLoading: true,
            ticket: {
                code: "",
                customer: "",
                booking: "",
                user: "",
            },
            ticketLoading: true,
        },
        undefined
    );
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getTickets = async () => {
        try {
            const response = await axios.get(`${apiUrl}/ticket`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.tickets,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getTicket = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/ticket/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.ticket,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addTicket = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/ticket`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.ticket,
                });
                return response.data;
            }
            await getTickets();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteTicket = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/ticket/${_id}`);
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
    const updateTicket = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/ticket/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.ticket,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const ticketContextData = {
        ticketState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getTickets,
        getTicket,
        addTicket,
        deleteTicket,
        updateTicket,
    };

    return (
        <TicketContext.Provider value={ticketContextData}>
            {children}
        </TicketContext.Provider>
    );
};

export default TicketContextProvider;
