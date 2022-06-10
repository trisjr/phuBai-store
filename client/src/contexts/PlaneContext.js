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
import { planeReducer } from "../reducers/planeReducer";

export const PlaneContext = createContext(undefined);

const PlaneContextProvider = ({ children }) => {
    const [planeState, dispatch] = useReducer(
        planeReducer,
        {
            planes: [],
            planesLoading: true,
            plane: {
                code: "",
                airline: "",
                status: "",
            },
            planeLoading: true,
        },
        undefined
    );
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const getPlanes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/plane`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.planes,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getPlane = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/plane/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.plane,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addPlane = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/plane`, addForm);
            if (response.data.success) {
                addForm._id = response.data.plane._id;
                dispatch({
                    type: ITEM_ADD,
                    payload: addForm,
                });
                return response.data;
            }
            await getPlanes();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deletePlane = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/plane/${_id}`);
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
    const updatePlane = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/plane/${_id}`,
                updateForm
            );
            if (response.data.success) {
                updateForm._id = response.data.plane._id;
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

    const planeContextData = {
        planeState,
        showAddForm,
        setShowAddForm,
        showUpdateForm,
        setShowUpdateForm,

        getPlanes,
        getPlane,
        addPlane,
        deletePlane,
        updatePlane,
    };

    return (
        <PlaneContext.Provider value={planeContextData}>
            {children}
        </PlaneContext.Provider>
    );
};

export default PlaneContextProvider;
