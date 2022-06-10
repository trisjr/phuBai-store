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
import { customerReducer } from "../reducers/customerReducer";

export const CustomerContext = createContext(undefined);

const CustomerContextProvider = ({ children }) => {
    const [customerState, dispatch] = useReducer(
        customerReducer,
        {
            customers: [],
            customersLoading: true,
            customer: {
                cccd: "",
                fullName: "",
                birthday: "",
                phone: "",
            },
            customerLoading: true,
        },
        undefined
    );
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getCustomers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/customer`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.customers,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getCustomer = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/customer/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.customer,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addCustomer = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/customer`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.customer,
                });
                return response.data;
            }
            await getCustomers();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteCustomer = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/customer/${_id}`);
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
    const updateCustomer = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/customer/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.customer,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const customerContextData = {
        customerState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getCustomers,
        getCustomer,
        addCustomer,
        deleteCustomer,
        updateCustomer,
    };

    return (
        <CustomerContext.Provider value={customerContextData}>
            {children}
        </CustomerContext.Provider>
    );
};

export default CustomerContextProvider;
