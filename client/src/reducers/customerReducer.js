import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const customerReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                customers: payload,
                customersLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                customers: [],
                customersLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                customer: payload,
                customerLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                customer: {
                    cccd: "",
                    fullName: "",
                    birthday: "",
                    phone: "",
                },
                customerLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                customers: [...state.customers, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                customers: state.customers.filter(
                    (customer) => customer._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                customers: state.customers.map((customer) =>
                    customer._id === payload._id ? payload : customer
                ),
            };

        default:
            return state;
    }
};
