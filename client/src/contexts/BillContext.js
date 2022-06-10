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
import { billReducer } from "../reducers/billReducer";

export const BillContext = createContext(undefined);

const BillContextProvider = ({ children }) => {
    const [billState, dispatch] = useReducer(
        billReducer,
        {
            bills: [],
            billsLoading: true,
            bill: {
                code: "",
                ticket: "",
                booking: "",
                cost: "",
                time: "",
            },
            billLoading: true,
        },
        undefined
    );
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getBills = async () => {
        try {
            const response = await axios.get(`${apiUrl}/bill`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.bills,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getBill = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/bill/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.bill,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addBill = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/bill`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.bill,
                });
                return response.data;
            }
            await getBills();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteBill = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/bill/${_id}`);
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
    const updateBill = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/bill/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.bill,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const billContextData = {
        billState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getBills,
        getBill,
        addBill,
        deleteBill,
        updateBill,
    };

    return (
        <BillContext.Provider value={billContextData}>
            {children}
        </BillContext.Provider>
    );
};

export default BillContextProvider;
