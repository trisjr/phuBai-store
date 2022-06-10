import axios from "axios";
import { createContext, useReducer } from "react";

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
import { userReducer } from "../reducers/userReducer";

export const UserContext = createContext(undefined);

const UserContextProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(
        userReducer,
        {
            users: [],
            usersLoading: true,
            user: {
                email: "",
                password: "",
                fullName: "",
                role: "",
            },
            userLoading: true,
        },
        undefined
    );

    const getUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user`);
            if (response.data.success) {
                dispatch({
                    type: LIST_LOADED_SUCCESS,
                    payload: response.data.users,
                });
            }
        } catch (error) {
            dispatch({ type: LIST_LOADED_FAIL });
        }
    };
    const getUser = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/user/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: ITEM_LOADED_SUCCESS,
                    payload: response.data.user,
                });
            }
        } catch (error) {
            dispatch({ type: ITEM_LOADED_FAIL });
        }
    };
    const addUser = async (addForm) => {
        try {
            const response = await axios.post(`${apiUrl}/user`, addForm);
            if (response.data.success) {
                dispatch({
                    type: ITEM_ADD,
                    payload: response.data.user,
                });
                return response.data;
            }
            await getUsers();
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };
    const deleteUser = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/user/${_id}`);
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
    const updateUser = async (_id, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/${_id}`,
                updateForm
            );
            if (response.data.success) {
                dispatch({
                    type: ITEM_UPDATE,
                    payload: response.data.user,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error!" };
        }
    };

    const userContextData = {
        userState,
        getUsers,
        getUser,
        addUser,
        deleteUser,
        updateUser,
    };

    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
