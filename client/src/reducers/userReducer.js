import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                users: payload,
                usersLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                users: [],
                usersLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                userLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                user: {
                    email: "",
                    password: "",
                    fullName: "",
                    role: "",
                },
                userLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                users: [...state.users, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== payload),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                users: state.users.map((user) =>
                    user._id === payload._id ? payload : user
                ),
            };

        default:
            return state;
    }
};
